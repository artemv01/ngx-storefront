import { KeyValue } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CartState } from '@app/cart-store/cart.reducer';
import { fadeInAnimation } from '@app/core/animations';
import { Product } from '@app/models/product';
import { ProductInCart } from '@app/models/product-in-cart';
import { ProductQuantity } from '@app/models/product-quantity';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart-table',
  templateUrl: './cart-table.component.html',
  styleUrls: ['./cart-table.component.scss'],
  animations: [fadeInAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartTableComponent implements OnInit {
  @Input('cartItems$') cartItems$: Observable<Map<string, ProductInCart>>;

  @Output('deleteItem') deleteItem = new EventEmitter<Product['_id']>();

  @Output('updateCart') updateCart = new EventEmitter<ProductQuantity>();

  updateMap: ProductQuantity = {};
  constructor() {}

  ngOnInit(): void {
    // this.cartItems$.subscribe((val) => console.log(val));
  }

  delete(id: Product['_id']) {
    this.deleteItem.emit(id);
  }
  addToUpdateCartMap(id: Product['_id'], quantity: number) {
    this.updateMap[id] = Number(quantity);
  }
  flushUpdateCartMap() {
    this.updateCart.emit(this.updateMap);
    this.updateMap = {};
  }

  // for keyvalue pipe, preserve the original order of items
  cartItemsOrderSort = () => {
    return 0;
  };
}
