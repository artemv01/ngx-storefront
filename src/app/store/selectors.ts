import { createFeatureSelector, createSelector } from '@ngrx/store';
import { featureKey, GlobalState } from '.';

export const selectState = createFeatureSelector<GlobalState>(featureKey);

export const selectCategories = createSelector(
  selectState,
  (state: GlobalState) => state.categories
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
export const selectSearchMode = createSelector(
  selectState,
  (state) => state.searchMode
);

export const selectLoading = createSelector(
  selectState,
  (state) => state.loading
);

export const selectError = createSelector(selectState, (state) => state.error);
