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
  @Input('cartItems$') cartItems$: CartState['cartContent'];
  @Output('deleteItem') deleteItem: EventEmitter<
    Product['_id']
  > = new EventEmitter<Product['_id']>();
  @Output('updateItem') updateItem: EventEmitter<UpdateItem> = new EventEmitter<
    UpdateItem
  >();
  constructor() {}

  ngOnInit(): void {
    // this.cartItems$.subscribe((val) => console.log(val));
  }

  delete(id: Product['_id']) {
    this.deleteItem.emit(id);
  }
  updateCart(id: Product['_id'], quantity: number) {
    this.updateItem.emit({
      itemId: id,
      quantity: Number(quantity),
    });
  }
}
