import { selectSingleProductPageData } from '@app/store/selectors';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSingleCategoryPage from './single-category-page.reducer';

export const selectState = createFeatureSelector<
  fromSingleCategoryPage.SingleCategoryPageState
>(fromSingleCategoryPage.singleCategoryPageFeatureKey);
export const selectProducts = createSelector(
  selectState,
  (state) => state.products
);
export const selectPagesTotal = createSelector(
  selectState,
  (state) => state.pagesTotal
);
export const selectCurrentPage = createSelector(
  selectState,
  (state) => state.currentPage
);
export const selectItemsTotal = createSelector(
  selectState,
  (state) => state.itemsTotal
);
export const selectShowPagination = createSelector(
  selectState,
  (state) => state.showPagination
);
export const selectCategoryName = createSelector(
  selectState,
  (state) => state.categoryName
);
export const selectLoading = createSelector(
  selectState,
  (state) => state.loading
);
