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
import { ProductQuantity } from '@app/models/product-quantity';
import { Observable } from 'rxjs';
import { UpdateItem } from '../../models/update-item';

@Component({
  selector: 'app-cart-table',
  templateUrl: './cart-table.component.html',
  styleUrls: ['./cart-table.component.scss'],
  animations: [fadeInAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartTableComponent implements OnInit {
  @Input('cartItems$') cartItems$: Observable<CartState['cartContent']>;

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
    this.updateMap[id] = quantity;
  }
  flushUpdateCartMap() {
    this.updateCart.emit(this.updateMap);
    this.updateMap = {};
  }

  /* productIdentify(index, item) {
    console.log(index);
    console.log(item);
    return item.value;
  } */

  // for keyvalue pipe, preserve the original order of items
  cartItemsOrderSort = (
    a: KeyValue<number, string>,
    b: KeyValue<number, string>
  ): number => {
    return 0;
  };
}
