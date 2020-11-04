import { Product } from '@app/models/product';
import { deepCopy } from '@app/store/helpers';
import { Action, createReducer, on } from '@ngrx/store';
import * as SingleCategoryPageActions from './single-category-page.actions';

export const singleCategoryPageFeatureKey = 'singleCategoryPage';

export interface SingleCategoryPageState {
  categoryName: string;
  products: Product[];
  pagesTotal: number;
  currentPage: number;
  itemsTotal: number;
  showPagination?: boolean;
}

export const initialState: SingleCategoryPageState = {
  categoryName: undefined,
  products: undefined,
  pagesTotal: undefined,
  currentPage: undefined,
  itemsTotal: undefined,
  showPagination: undefined,
};

export const reducer = createReducer(
  initialState,

  on(SingleCategoryPageActions.loadPageDataSuccess, (state, action) => {
    const copy = deepCopy(state);
    return { ...copy, ...action.payload };
  })
);
