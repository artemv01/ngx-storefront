import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Product } from '@app/type/product';
import { trigger, transition, style, animate } from '@angular/animations';
import { CartService } from '@app/service/cart.service';
import { NotificationService } from '@app/service/notification.service';
@Component({
  selector: 'app-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: '0' }),
        animate('.5s ease-out', style({ opacity: '1' })),
      ]),
    ]),
    /*  trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: '0' }),
        animate('.5s ease-out', style({ opacity: '1' })),
      ]),
    ]), */
  ],
})
export class ProductGridComponent implements OnInit {
  columns = '';
  addedToCart = {};
  @Input('products') products: Product[];
  @Input('rating') rating = true;
  @Input('columnsNumber') columnsNumber = 3;
  @Output() actionBtn = new EventEmitter<any>();
  constructor(public cart: CartService, private notify: NotificationService) {}

  ngOnInit(): void {
    this.columns = 'lg:w-1/' + this.columnsNumber;
  }

  addToCart(product: Product) {
    const { _id, image, name, ...other } = product;
    let price = product.onSale ? product.salePrice : product.price;
    this.cart.add(({
      _id,
      image,
      name,
      price,
      quantity: 1,
    } as unknown) as Product);
    this.notify.push({ showMessage: 'addToCartSuccess' });
  }
}
