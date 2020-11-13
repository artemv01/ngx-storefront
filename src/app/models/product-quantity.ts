import { Product } from '@app/models/product';

export type ProductQuantity = Record<Product['_id'], number>;
