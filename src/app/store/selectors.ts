import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ShopState, featureKey } from '.';

export const selectState = createFeatureSelector<ShopState>(featureKey);

export const selectHomePageData = createSelector(
  selectState,
  (state: ShopState) => state.homePage
);
export const selectSingleProductPageData = createSelector(
  selectState,
  (state: ShopState) => state.singleProductPage
);
export const selectIsSingleProductPageLoaded = createSelector(
  selectState,
  (state: ShopState) => state.singleProductPage.loaded
);

export const selectReviewLoading = createSelector(
  selectState,
  (state: ShopState) => state.singleProductPage.createReviewLoading
);

export const selectIsLoaded = createSelector(
  selectState,
  (state: ShopState) => state.loaded
);
export const selectCategories = createSelector(
  selectState,
  (state: ShopState) => state.categories
);
