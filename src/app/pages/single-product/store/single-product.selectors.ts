import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSingleProduct from './single-product.reducer';

export const selectSingleProductState = createFeatureSelector<
  fromSingleProduct.SingleProductState
>(fromSingleProduct.singleProductFeatureKey);
export const selectProduct = createSelector(
  selectSingleProductState,
  (state: fromSingleProduct.SingleProductState) => state.product
);
export const selectSingleProductPage = createSelector(
  selectSingleProductState,
  (state: fromSingleProduct.SingleProductState) => state
);
export const selectReviewLoading = createSelector(
  selectSingleProductState,
  (state: fromSingleProduct.SingleProductState) => state.createReviewLoading
);

export const selectSingleProduct = createSelector(
  selectSingleProductState,
  (state: fromSingleProduct.SingleProductState) => state.product
);
export const selectRelatedProducts = createSelector(
  selectSingleProductState,
  (state: fromSingleProduct.SingleProductState) => state.relatedProducts
);
