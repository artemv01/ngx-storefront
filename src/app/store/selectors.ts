import { createFeatureSelector, createSelector } from '@ngrx/store';
import { featureKey, ShopState } from '.';

export const selectState = createFeatureSelector<ShopState>(featureKey);

export const selectCategories = createSelector(
  selectState,
  (state: ShopState) => state.categories
);
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

export const selectSearchLoading = createSelector(
  selectState,
  (state) => state.searchLoading
);
export const selectSearchModel = createSelector(
  selectState,
  (state) => state.searchMode
);
