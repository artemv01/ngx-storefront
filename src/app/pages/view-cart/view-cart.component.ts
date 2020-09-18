import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '@app/service/cart.service';
import { Product } from '@app/type/product';
import { environment } from '@root/environments/environment';
import { Router } from '@angular/router';
import { NotificationService } from '@app/service/notification.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: '0' }),
        animate('.5s ease-out', style({ opacity: '1' })),
      ]),
    ]),
  ],
})
export class ViewCartComponent implements OnInit, OnDestroy {
  uploadsUrl = environment.uploadsUrl;

  constructor(
    public cart: CartService,
    public router: Router,
    private notify: NotificationService
  ) {}

  ngOnInit(): void {}

  get isCartEmpty() {
    return !Object.keys(this.cart.cartContent).length;
  }

  goToCheckout() {
    this.cart.updateTotals();
    this.router.navigate(['checkout']);
  }
  updateTotals() {
    this.cart.updateTotals();
    this.notify.push({ message: 'Cart totals has been updated.' });
  }
  ngOnDestroy() {
    this.notify.dismissAll();
  }
}
