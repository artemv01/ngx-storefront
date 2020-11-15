import { RecaptchaComponent } from 'ng-recaptcha';
import { ReconfigurableOptions } from 'places.js';
import { filter, first, map, finalize } from 'rxjs/operators';

import { animate, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import {
  createOrder,
  resetOrderCreated,
} from '@app/cart-store/cart.actions';
import {
  selectCartItems,
  selectIsOrderCreated,
  selectOrderLoading,
  selectTotalPrice,
} from '@app/cart-store/cart.selectors';
import { Product } from '@app/models/product';
import { OrderService } from '@app/services/order.service';
import { TitleService } from '@app/services/title.service';
import { Store } from '@ngrx/store';
import { environment } from '@root/environments/environment';
import { Observable } from 'rxjs';
import { CartState } from '@app/cart-store/cart.reducer';
import { ProductInCart } from '@app/models/product-in-cart';

function getCartContentForRequest(
  cartItems: Record<Product['_id'], ProductInCart>
) {
  const cart = {};
  for (const [productId, product] of Object.entries(cartItems)) {
    cart[productId] = product.quantity;
  }
  return cart;
}

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

  createOrderLoading$: Observable<boolean>;
  cartContent$: Observable<Record<string, ProductInCart>>;
  totalPrice$: Observable<number>;

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
    public cartStore: Store<CartState>,
    private orderQuery: OrderService,
    private titleServ: TitleService
  ) {
    this.createOrderLoading$ = cartStore.select(selectOrderLoading);
    this.cartContent$ = cartStore.select(selectCartItems);
    this.totalPrice$ = cartStore.select(selectTotalPrice);
    this.cartStore
      .select(selectIsOrderCreated)
      .pipe(
        filter((created) => created),
        first(),
        finalize(() => cartStore.dispatch(resetOrderCreated()))
      )
      .subscribe(() => {
        this.formSubmitted = true;
        this.reCaptcha.reset();
        this.scrollTo(this.topEl.nativeElement);
      });
  }

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
    const { notes, ...address } = this.addressForm.value;
    const billingAddress = address;
    const shippingAddress = address;
    this.cartStore
      .select(selectCartItems)
      .pipe(
        filter((items) => !!items),
        map((items) => getCartContentForRequest(items)),
        map((items) => ({
          billingAddress,
          shippingAddress,
          notes,
          cart: items,
          captcha: this.captchaToken,
        })),
        map((payload) => this.cartStore.dispatch(createOrder({ payload }))),
        first()
      )
      .subscribe(() => {});
  }
}
