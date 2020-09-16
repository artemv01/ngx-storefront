import { Review } from '@app/type/review';
export interface Product {
  _id: string;
  name: string;

  description: string;

  price: number;

  salePrice: number;

  onSale: boolean;

  rating: number;

  ratingCount: number;

  image: string;

  reviews: Review[];

  quantity?: number;

  categories?: {
    name: string;
    id: string;
  }[];
}
