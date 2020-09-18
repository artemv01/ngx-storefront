import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ReconfigurableOptions } from 'places.js';
import { CartService } from '@app/service/cart.service';
import { ApiService } from '@app/service/api.service';
import { trigger, transition, style, animate } from '@angular/animations';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: '0' }),
        animate('.5s ease-out', style({ opacity: '1' })),
      ]),
    ]),
  ],
})
export class CheckoutComponent implements OnInit {
  @ViewChild('submitBtn', { read: ElementRef }) submitBtn: ElementRef;

  formSubmitted = false;

  addressForm = this.fb.group({
    first_name: ['Artem', [Validators.required]],
    last_name: ['Artemev', [Validators.required]],
    address_line1: ['Kolotushkovo', [Validators.required]],
    address_line2: [''],
    zip: ['213213', [Validators.required]],
    country: ['Russia', [Validators.required]],
    city: ['Moscow', [Validators.required]],
    state: [''],
    email: ['artem@example.com', [Validators.required, Validators.email]],
    phone: ['21321321', [Validators.required]],
    notes: ['he hey hey'],
  });
  validate = {
    firstName: {
      required: 'First name is required',
    },
    lastName: {
      required: 'Last name is required',
    },
    email: {
      required: 'Email is required',
      email: 'Email is incorrect',
    },
    addressLine1: {
      required: 'Address is required',
    },
    zip: {
      required: 'Zip code is required',
      type: 'Zip code should be numeric',
    },
    country: {
      required: 'Country is required',
    },
    city: {
      required: 'City is required',
    },
    phone: {
      required: 'Phone is required',
      type: 'Phone should be numeric',
    },
  };
  get firstName(): AbstractControl {
    return this.addressForm.get('first_name');
  }
  get lastName(): AbstractControl {
    return this.addressForm.get('last_name');
  }
  get addressLine1(): AbstractControl {
    return this.addressForm.get('address_line1');
  }
  get addressLine2(): AbstractControl {
    return this.addressForm.get('address_line2');
  }
  get country(): AbstractControl {
    return this.addressForm.get('country');
  }
  get city(): AbstractControl {
    return this.addressForm.get('city');
  }
  get state(): AbstractControl {
    return this.addressForm.get('state');
  }
  get email(): AbstractControl {
    return this.addressForm.get('email');
  }
  get phone(): AbstractControl {
    return this.addressForm.get('phone');
  }
  get zip(): AbstractControl {
    return this.addressForm.get('zip');
  }
  get notes(): AbstractControl {
    return this.addressForm.get('notes');
  }
  placesConfigs: Record<string, ReconfigurableOptions> = {
    country: {
      type: 'country',
    },

    address: {
      type: 'address',
    },

    city: {
      type: 'city',
    },
  };

  constructor(
    private fb: FormBuilder,
    public cart: CartService,
    private api: ApiService
  ) {}

  ngOnInit(): void {}

  submitOrder() {
    (this.submitBtn.nativeElement as HTMLElement).classList.add('loading');
    const { notes, ...address } = this.addressForm.value;
    const billingAddress = address;
    const shippingAddress = address;
    const cart = this.cart.getContentForRequest();
    this.api
      .submitOrder({
        billingAddress,
        shippingAddress,
        notes,
        cart,
      })
      .subscribe((result) => {
        this.cart.clean();
        this.formSubmitted = true;
        (this.submitBtn.nativeElement as HTMLElement).classList.remove(
          'loading'
        );
      });
  }
}
