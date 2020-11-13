import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '@app/services/cart.service';
import { Product } from '@app/models/product';
import { environment } from '@root/environments/environment';
import { Router } from '@angular/router';
import { NotificationService } from '@app/services/notification.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { TitleService } from '@app/services/title.service';
import { CartState } from '@app/cart-store/cart.reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  selectCartItems,
  selectIsCartEmpty,
  selectTotalPrice,
} from '@app/cart-store/cart.selectors';
import {
  deleteOne,
  updateOne,
  updateTotals,
} from '@app/cart-store/cart.actions';
import { UpdateItem } from '@app/models/update-item';
import { fadeInAnimation } from '@app/core/animations';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.scss'],
  animations: [fadeInAnimation],
})
export class ViewCartComponent implements OnInit, OnDestroy {
  isCartEmpty$: Observable<boolean>;
  cartItems$: Observable<CartState['cartContent']>;
  totalPrice$: Observable<number>;
  constructor(
    public router: Router,
    private notify: NotificationService,
    private titleServ: TitleService,
    private cartStore: Store<CartState>
  ) {
    this.isCartEmpty$ = cartStore.select(selectIsCartEmpty);
    this.totalPrice$ = cartStore.select(selectTotalPrice);
    this.cartItems$ = cartStore.select(selectCartItems);
  }

  ngOnInit(): void {
    this.titleServ.set('Your Cart');
  }

  goToCheckout() {
    this.cartStore.dispatch(updateTotals());
    this.router.navigate(['checkout']);
  }
  /* updateTotals() {
    this.cartStore.dispatch(updateTotals());
    this.notify.push({ message: 'Cart totals has been updated.' });
  } */
  updateItem(payload: UpdateItem) {
    this.cartStore.dispatch(updateOne({ payload }));
  }
  deleteItem(id: Product['_id']) {
    this.cartStore.dispatch(deleteOne({ payload: id }));
  }
  ngOnDestroy() {
    this.notify.dismissAll();
  }
}
