import { Review } from './review';

export interface ReviewsForProductResp {
  reviews: Review[];
  ratingCount: number;
  rating: number;
}
