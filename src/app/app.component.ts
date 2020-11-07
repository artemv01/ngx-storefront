import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadCart } from './cart-store/cart.actions';
import { CartState } from './cart-store/cart.reducer';
import { fadeAnimation } from './core/animations';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeAnimation],
})
export class AppComponent {
  title = 'ngx-storefront';
  constructor(
    public loading: LoadingService,
    private cartStore: Store<CartState>
  ) {}
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
