import { HttpErrorResponse } from '@angular/common/http';
import { CreateReviewResp } from '@app/models/create-review-resp';
import { Product } from '@app/models/product';
import { Review } from '@app/models/review';
import { createAction, props } from '@ngrx/store';
import { SingleProductState } from './single-product.reducer';

export const loadSingleProductPage = createAction(
  '[Single Product Component] Load Single Product Page',
  props<{ itemId: Product['_id'] }>()
);
export const loadSingleProductPageSuccess = createAction(
  '[Single Product Component] Load Single Product Page Success',
  props<{ payload: SingleProductState }>()
);
export const loadSingleProductPageFailure = createAction(
  '[Single Product Component] Load Single Product Page Failure',
  props<{ error: HttpErrorResponse }>()
);
export const createReview = createAction(
  '[Single Product Component] Create Review',
  props<{ payload: Review }>()
);
export const createReviewSuccess = createAction(
  '[Single Product Component] Create Review Success',
  props<{ payload: CreateReviewResp }>()
);
export const createReviewFailure = createAction(
  '[Single Product Component] Create Review Failure',
  props<{ error: HttpErrorResponse }>()
);
