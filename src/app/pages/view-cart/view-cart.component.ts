import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '@app/models/product';
import { Router } from '@angular/router';
import { NotificationService } from '@app/services/notification.service';
import { TitleService } from '@app/services/title.service';
import { CartState } from '@app/cart-store/cart.reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  selectCartItems,
  selectCartItemsMap,
  selectIsCartEmpty,
  selectTotalPrice,
} from '@app/cart-store/cart.selectors';
import { deleteOne, updateTotals } from '@app/cart-store/cart.actions';
import { fadeInAnimation } from '@app/core/animations';
import { ProductQuantity } from '@app/models/product-quantity';
import { ProductInCart } from '@app/models/product-in-cart';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.scss'],
  animations: [fadeInAnimation],
})
export class ViewCartComponent implements OnInit, OnDestroy {
  isCartEmpty$: Observable<boolean>;
  cartItems$: Observable<Map<string, ProductInCart>>;
  totalPrice$: Observable<number>;
  constructor(
    public router: Router,
    private notify: NotificationService,
    private titleServ: TitleService,
    private cartStore: Store<CartState>
  ) {
    this.isCartEmpty$ = cartStore.select(selectIsCartEmpty);
    this.totalPrice$ = cartStore.select(selectTotalPrice);
    this.cartItems$ = cartStore.select(selectCartItemsMap);
  }

  ngOnInit(): void {
    this.titleServ.set('Your Cart');
  }

  goToCheckout() {
    this.router.navigate(['checkout']);
  }
  updateTotals(payload: ProductQuantity) {
    this.cartStore.dispatch(updateTotals({ payload }));
    this.notify.push({ message: 'Cart totals has been updated.' });
  }

  deleteItem(id: Product['_id']) {
    this.cartStore.dispatch(deleteOne({ payload: id }));
  }
  ngOnDestroy() {
    this.notify.dismissAll();
  }
}
