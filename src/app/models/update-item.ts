import { Product } from '@app/models/product';

export interface UpdateItem {
  itemId: Product['_id'];
  quantity: number;
}
