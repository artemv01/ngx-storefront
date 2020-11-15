import { Product } from '@app/models/product';
import { createReducer, on } from '@ngrx/store';
import * as SingleCategoryPageActions from './single-category-page.actions';

export const singleCategoryPageFeatureKey = 'singleCategoryPage';

export interface SingleCategoryPageState {
  categoryName: string;
  products: Product[];
  pagesTotal: number;
  currentPage: number;
  itemsTotal: number;
  showPagination?: boolean;
  loading?: boolean;
}

export const initialState: SingleCategoryPageState = {
  categoryName: undefined,
  products: undefined,
  pagesTotal: undefined,
  currentPage: undefined,
  itemsTotal: undefined,
  showPagination: false,
  loading: false,
};

export const reducer = createReducer(
  initialState,

  on(SingleCategoryPageActions.loadPageData, (state, action) => ({
    ...state,
    loading: true,
  })),
  on(SingleCategoryPageActions.loadPageDataSuccess, (state, action) => ({
    ...state,
    ...action.payload,
    loading: false,
  }))
);
