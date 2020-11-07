import { Product } from './product';

export interface ProductInCart {
  _id: Product['_id'];
  image: string;
  name: string;
  price: number;
  quantity: number;
}
