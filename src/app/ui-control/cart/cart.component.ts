import { Component, OnInit, Input } from '@angular/core';
import { CartService } from '@app/services/cart.service';
import { Product } from '@app/models/product';
import { environment } from '@root/environments/environment';
import { trigger, transition, style, animate } from '@angular/animations';

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
  @Input('isDark') isDark: boolean = false;
  constructor(public cart: CartService) {}
  ngOnInit(): void {}
}
