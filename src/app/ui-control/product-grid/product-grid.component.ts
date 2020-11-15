import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as CartSelectors from '@app/cart-store/cart.actions';
import { CartState } from '@app/cart-store/cart.reducer';
import { Product } from '@app/models/product';
import { ProductInCart } from '@app/models/product-in-cart';
import { Store } from '@ngrx/store';

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
  constructor(public cartStore: Store<CartState>) {}

  ngOnInit(): void {
    this.columns = 'lg:w-1/' + this.columnsNumber;
  }

  addToCart(product: Product) {
    const { _id, image, name } = product;
    let price = product.onSale ? product.salePrice : product.price;
    const payload: ProductInCart = {
      _id,
      image,
      name,
      price,
      quantity: 1,
    };
    this.cartStore.dispatch(CartSelectors.addItem({ payload }));
  }
}
