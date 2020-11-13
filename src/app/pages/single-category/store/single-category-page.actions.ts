import { HttpErrorResponse } from '@angular/common/http';
import { Product } from '@app/models/product';
import { QueryItemsReq } from '@app/models/query-items-req';
import { QueryItemsResp } from '@app/models/query-items-resp';
import { createAction, props } from '@ngrx/store';
import { SingleCategoryPageState } from './single-category-page.reducer';

export const loadPageData = createAction(
  '[Single Category Page] Load Single Category Page Data',
  props<{ payload: QueryItemsReq; pageLoading?: boolean }>()
);

export const loadPageDataSuccess = createAction(
  '[Single Category Page] Load Single Category Page Data Success',
  props<{ payload: SingleCategoryPageState }>()
);
export const loadPageDataFailure = createAction(
  '[Single Category Page] Load Single Category Page Data Failure',
  props<{ error: HttpErrorResponse }>()
);
