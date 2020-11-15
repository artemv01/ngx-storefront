import { Component, OnInit, Input } from '@angular/core';
import { Product } from '@app/models/product';
import { trigger, transition, style, animate } from '@angular/animations';
import { Observable } from 'rxjs';
import { CartState } from '@app/cart-store/cart.reducer';
import { Store } from '@ngrx/store';
import {
  selectCartItems,
  selectTotalPrice,
  selectTotalQuantity,
} from '@app/cart-store/cart.selectors';
import { deleteOne } from '@app/cart-store/cart.actions';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: '0' }),
        animate('.5s ease-out', style({ opacity: '1' })),
      ]),
    ]),
  ],
})
export class CartComponent implements OnInit {
  cartItems$: Observable<CartState['cartContent']>;
  totalPrice$: Observable<number>;
  totalQuantity$: Observable<number>;
  @Input('isDark') isDark: boolean = false;
  constructor(public cartStore: Store<CartState>) {
    this.cartItems$ = cartStore.select(selectCartItems);
    this.totalPrice$ = cartStore.select(selectTotalPrice);
    this.totalQuantity$ = cartStore.select(selectTotalQuantity);
  }
  ngOnInit(): void {}
  deleteItem(id: Product['_id']) {
    this.cartStore.dispatch(deleteOne({ payload: id }));
  }
}
