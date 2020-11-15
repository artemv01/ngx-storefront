import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, first } from 'rxjs/operators';
import { loadCart } from './cart-store/cart.actions';
import { CartState } from './cart-store/cart.reducer';
import { fadeAnimation } from './core/animations';
import { NotificationService } from './services/notification.service';
import { GlobalState } from './store';
import { selectError, selectLoading } from './store/selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeAnimation],
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'ngx-storefront';
  isLoading$: Observable<boolean>;
  constructor(
    private cartStore: Store<CartState>,
    private store: Store<GlobalState>,
    private notify: NotificationService
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
    this.store
      .select(selectError)
      .pipe(filter((error) => !!error))
      .subscribe((error: HttpErrorResponse) => {
        console.log(error);
        this.notify.push({
          type: 'error',
          message:
            error?.status === 0 ? 'Network error &#128517;' : error.message,
        });
      });
  }

  ngAfterViewInit() {}
}
