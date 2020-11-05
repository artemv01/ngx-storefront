import { Product } from '@app/models/product';
import { Review } from '@app/models/review';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on,
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { HttpErrorResponse } from '@angular/common/http';
import { Category } from '@app/models/category';
import { deepCopy } from './helpers';
import * as ShopActions from './actions';
export const featureKey = 'shop';
export interface ShopState {
  categories: Category[];
  error: HttpErrorResponse;

  searchMode: boolean;
  searchLoading: boolean;
  products: Product[];
  pagesTotal: number;
  currentPage: number;
  itemsTotal: number;
  showPagination: boolean;
}
export const initialState = {
  categories: [],
  error: undefined,
};

export const reducers = createReducer(
  initialState,
  on(ShopActions.loadCategoriesSuccess, (state: ShopState, action) => {
    const stateCopy = deepCopy<ShopState>(state);
    stateCopy.categories = action.payload;
    return stateCopy;
  }),
  on(ShopActions.loadSearch, (state: ShopState, action) => {
    const stateCopy = deepCopy<ShopState>(state);
    return { ...stateCopy, searchLoading: true, searchMode: true };
  }),
  on(ShopActions.loadSearchSuccess, (state: ShopState, action) => {
    const stateCopy = deepCopy<ShopState>(state);
    return { ...stateCopy, ...action.payload, searchLoading: false };
  }),
  on(ShopActions.setSearchMode, (state: ShopState, action) => {
    const stateCopy = deepCopy<ShopState>(state);
    return { ...stateCopy, searchMode: action.set };
  })
);

/* export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
 */
