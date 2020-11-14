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
import { stat } from 'fs';

export const featureKey = 'global';
export interface GlobalState {
  categories: Category[];
  error: HttpErrorResponse;

  searchMode: boolean;
  searchLoading: boolean;
  products: Product[];
  pagesTotal: number;
  currentPage: number;
  itemsTotal: number;
  showPagination: boolean;
  loading: boolean;
  loadingCounter: number;
}
export const initialState = {
  categories: [],
  error: undefined,
  loading: false,
  loadingCounter: 0,
};

export const reducers = createReducer(
  initialState,
  on(ShopActions.loadCategoriesSuccess, (state: GlobalState, action) => {
    const stateCopy = deepCopy<GlobalState>(state);
    stateCopy.categories = action.payload;
    return stateCopy;
  }),
  on(ShopActions.loadSearch, (state: GlobalState, action) => {
    const stateCopy = deepCopy<GlobalState>(state);
    return { ...stateCopy, searchLoading: true, searchMode: true };
  }),
  on(ShopActions.loadSearchSuccess, (state: GlobalState, action) => {
    const stateCopy = deepCopy<GlobalState>(state);
    return { ...stateCopy, ...action.payload, searchLoading: false };
  }),
  on(ShopActions.setSearchMode, (state: GlobalState, action) => {
    const stateCopy = deepCopy<GlobalState>(state);
    return { ...stateCopy, searchMode: action.set };
  }),

  on(ShopActions.loadingOn, (state: GlobalState, action) => {
    const loadingCounter = state.loadingCounter + 1;
    return { ...state, loadingCounter, loading: true };
  }),
  on(ShopActions.loadingOff, (state: GlobalState, action) => {
    let loadingCounter =
      state.loadingCounter > 0 ? state.loadingCounter - 1 : 0;
    let loading = loadingCounter > 0;
    return { ...state, loadingCounter, loading };
  }),
  on(ShopActions.loadingOffForce, (state: GlobalState, action) => ({
    ...state,
    loadingCounter: 0,
    loading: false,
  })),

  on(ShopActions.setError, (state: GlobalState, action) => ({
    ...state,
    error: action.error,
  }))
);
