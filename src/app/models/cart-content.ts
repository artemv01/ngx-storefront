import { Product } from './product';
import { ProductInCart } from './product-in-cart';

export type CartContent = Record<Product['_id'], ProductInCart>;
