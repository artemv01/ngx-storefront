import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromHomePageState from './home-page.reducer';

export const selectState = createFeatureSelector<
  fromHomePageState.HomePageState
>(fromHomePageState.homePageStateFeatureKey);
export const selectTopRatedProducts = createSelector(
  selectState,
  (state: fromHomePageState.HomePageState) => state.topRatedProducts
);
export const selectOnSaleProducts = createSelector(
  selectState,
  (state: fromHomePageState.HomePageState) => state.onSaleProducts
);
export const selectRecentReviews = createSelector(
  selectState,
  (state: fromHomePageState.HomePageState) => state.recentReviews
);
export const selectHomePageLoaded = createSelector(
  selectState,
  (state: fromHomePageState.HomePageState) => state.loaded
);
