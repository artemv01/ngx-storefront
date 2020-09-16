import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '@app/service/cart.service';
import { Product } from '@app/type/product';
import { environment } from '@root/environments/environment';
import { Router } from '@angular/router';
import { NotificationService } from '@app/service/notification.service';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.scss'],
})
export class ViewCartComponent implements OnInit, OnDestroy {
  uploadsUrl = environment.uploadsUrl;

  constructor(
    public cart: CartService,
    public router: Router,
    private notify: NotificationService
  ) {}

  ngOnInit(): void {}
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
