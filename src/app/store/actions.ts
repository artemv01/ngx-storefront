import { HttpErrorResponse } from '@angular/common/http';
import { Review } from '@app/models/review';
import { createAction, props } from '@ngrx/store';
import { Product } from '@app/models/product';
import { Category } from '@app/models/category';
import { CreateReviewResp } from '@app/models/create-review-resp';
import { QueryItemsResp } from '@app/models/query-items-resp';
import { ShopState } from '.';
import { QueryItemsReq } from '@app/models/query-items-req';

export const loadCategories = createAction(
  '[Header Component] Load Categories'
);
export const loadCategoriesSuccess = createAction(
  '[Header Component] Load Categories Success',
  props<{ payload: Category[] }>()
);
export const loadCategoriesFailure = createAction(
  '[Header Component] Load Categories Failure',
  props<{ error: HttpErrorResponse }>()
);

export const loadSearch = createAction(
  '[Shop Component] Load Search',
  props<{ payload: QueryItemsReq }>()
);
export const loadSearchSuccess = createAction(
  '[Shop Component] Load Search Success',
  props<{ payload: Partial<ShopState> }>()
);
export const loadSearchFailure = createAction(
  '[Shop Component] Load Search Failure',
  props<{ error: HttpErrorResponse }>()
);
export const setSearchMode = createAction(
  '[Shop Component] Set Search Mode',
  props<{ set: boolean }>()
);