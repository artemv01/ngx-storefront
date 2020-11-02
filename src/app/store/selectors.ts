import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ShopState, featureKey } from '.';

export const selectState = createFeatureSelector<ShopState>(featureKey);

export const selectHomePageData = createSelector(
  selectState,
  (state: ShopState) => state.homePage
);
export const selectIsLoaded = createSelector(
  selectState,
  (state: ShopState) => state.loaded
);
export const selectCategories = createSelector(
  selectState,
  (state: ShopState) => state.categories
);
