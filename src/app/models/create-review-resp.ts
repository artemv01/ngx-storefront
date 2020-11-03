import { Review } from './review';

export interface CreateReviewResp {
  reviews: Review[];
  rating: number;
  ratingCount: number;
}
