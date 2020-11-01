import { HttpErrorResponse } from '@angular/common/http';
import { Review } from '@app/models/review';
import { createAction, props } from '@ngrx/store';
import { Product } from '@app/models/product';
import { IHomePageState } from '..';

export const loadHomePage = createAction(
  '[Home Component] Load Home Page Data'
);
export const loadHomePageSuccess = createAction(
  '[Home Component] Load Home Page Data Success',
  props<IHomePageState>()
);
export const loadHomePageFailure = createAction(
  '[Home Component] Load Home Page Data Failure',
  props<{ error: HttpErrorResponse }>()
);

/* 
export const loadOnSaleProducts = createAction(
  '[Home Component] Load On Sale Products'
);
export const loadOnSaleProductsSuccess = createAction(
  '[Home Component] Load On Sale Products Success',
  props<{ products: Product[] }>()
);
export const loadOnSaleProductsFailure = createAction(
  '[Home Component] LoadOn Sale Products Failure',
  props<{ error: HttpErrorResponse }>()
);

export const loadRecentReviews = createAction(
  '[Home Component] Load Recent Reviews'
);
export const loadRecentReviewsSuccess = createAction(
  '[Home Component] Load Recent Reviews Success',
  props<{ reviews: Review[] }>()
);
export const loadRecentReviewsFailure = createAction(
  '[Home Component] Load Recent Reviews Failure',
  props<{ error: HttpErrorResponse }>()
);
 */
