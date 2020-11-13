import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadCart } from './cart-store/cart.actions';
import { CartState } from './cart-store/cart.reducer';
import { fadeAnimation } from './core/animations';
import { ShopState } from './store';
import { selectLoading } from './store/selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeAnimation],
})
export class AppComponent {
  title = 'ngx-storefront';
  isLoading$: Observable<boolean>;
  constructor(
    private cartStore: Store<CartState>,
    private store: Store<ShopState>
  ) {
    this.isLoading$ = store.select(selectLoading);
  }
  ngOnInit() {
    this.cartStore.dispatch(loadCart());
    const splashScreen: HTMLElement = document.getElementById(
      'appLoadAnimation'
    );
    if (splashScreen) {
      splashScreen.remove();
    }
  }
}
