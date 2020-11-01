import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ReconfigurableOptions } from 'places.js';
import { CartService } from '@app/services/cart.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { TitleService } from '@app/services/title.service';
import { RecaptchaComponent } from 'ng-recaptcha';
import { environment } from '@root/environments/environment';
import { OrderService } from '@app/services/order.service';
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
  environment = environment;
  @ViewChild('submitBtn', { read: ElementRef }) submitBtn: ElementRef;
  @ViewChild('topEl', { read: ElementRef }) topEl: ElementRef;
  @ViewChild('reCaptcha', { read: RecaptchaComponent }) reCaptcha;

  formSubmitted = false;
  captchaToken = '';

  postOrderLoading: boolean;

  addressForm = this.fb.group({
    first_name: ['', [Validators.required]],
    last_name: ['', [Validators.required]],
    address_line1: ['', [Validators.required]],
    address_line2: [''],
    zip: ['', [Validators.required]],
    country: ['', [Validators.required]],
    city: ['', [Validators.required]],
    state: [''],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required]],
    notes: [''],
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
      language: 'en',
    },

    address: {
      type: 'address',
      language: 'en',
    },

    city: {
      type: 'city',
      language: 'en',
    },
  };

  constructor(
    private fb: FormBuilder,
    public cart: CartService,
    private orderQuery: OrderService,
    private titleServ: TitleService
  ) {}

  ngOnInit(): void {
    this.titleServ.set('Checkout');
  }

  scrollTo($el) {
    $el.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  }

  captchaEvent(result: string) {
    this.captchaToken = result;
  }

  submitOrder() {
    this.postOrderLoading = true;
    const { notes, ...address } = this.addressForm.value;
    const billingAddress = address;
    const shippingAddress = address;
    const cart = this.cart.getContentForRequest();
    this.orderQuery
      .create({
        billingAddress,
        shippingAddress,
        notes,
        cart,
        captcha: this.captchaToken,
      })
      .subscribe((result) => {
        this.cart.clean();
        this.formSubmitted = true;

        this.postOrderLoading = true;

        this.reCaptcha.reset();
        this.scrollTo(this.topEl.nativeElement);
      });
  }
}
