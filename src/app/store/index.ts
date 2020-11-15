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
import * as GlobalActions from './actions';
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
  on(GlobalActions.loadCategoriesSuccess, (state: GlobalState, action) => ({
    ...state,
    categories: action.payload,
  })),
  on(GlobalActions.loadSearch, (state: GlobalState, action) => ({
    ...state,
    searchLoading: true,
    searchMode: true,
  })),
  on(GlobalActions.loadSearchSuccess, (state: GlobalState, action) => ({
    ...state,
    ...action.payload,
    searchLoading: false,
  })),
  on(GlobalActions.setSearchMode, (state: GlobalState, action) => ({
    ...state,
    searchMode: action.set,
  })),

  on(GlobalActions.loadingOn, (state: GlobalState, action) => {
    const loadingCounter = state.loadingCounter + 1;
    return { ...state, loadingCounter, loading: true };
  }),
  on(GlobalActions.loadingOff, (state: GlobalState, action) => {
    let loadingCounter =
      state.loadingCounter > 0 ? state.loadingCounter - 1 : 0;
    let loading = loadingCounter > 0;
    return { ...state, loadingCounter, loading };
  }),
  on(GlobalActions.loadingOffForce, (state: GlobalState, action) => ({
    ...state,
    loadingCounter: 0,
    loading: false,
  })),

  on(GlobalActions.setError, (state: GlobalState, action) => ({
    ...state,
    error: action.error,
  }))
);
