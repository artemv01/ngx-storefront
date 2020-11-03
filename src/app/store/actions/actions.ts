import { HttpErrorResponse } from '@angular/common/http';
import { Review } from '@app/models/review';
import { createAction, props } from '@ngrx/store';
import { Product } from '@app/models/product';
import { IHomePageState, ISingleProductPageState } from '..';
import { Category } from '@app/models/category';
import { CreateReviewResp } from '@app/models/create-review-resp';

export const loadHomePage = createAction(
  '[Home Component] Load Home Page Data'
);
export const loadHomePageSuccess = createAction(
  '[Home Component] Load Home Page Data Success',
  props<{ payload: IHomePageState }>()
);
export const loadHomePageFailure = createAction(
  '[Home Component] Load Home Page Data Failure',
  props<{ error: HttpErrorResponse }>()
);

export const loadCategories = createAction(
  '[Header Component] Load Categories'
);
export const loadCategoriesSuccess = createAction(
  '[Header Component] Load Categories Success',
  props<{ categories: Category[] }>()
);
export const loadCategoriesFailure = createAction(
  '[Header Component] Load Categories Failure',
  props<{ error: HttpErrorResponse }>()
);

export const loadSingleProductPage = createAction(
  '[Single Product Component] Load Single Product Page',
  props<{ itemId: Product['_id'] }>()
);
export const loadSingleProductPageSuccess = createAction(
  '[Single Product Component] Load Single Product Page Success',
  props<{ payload: ISingleProductPageState }>()
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
