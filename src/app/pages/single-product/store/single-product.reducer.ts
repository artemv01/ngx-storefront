import { Product } from '@app/models/product';
import { deepCopy } from '@app/store/helpers';
import { createReducer, on } from '@ngrx/store';
import * as SingleProductActions from './single-product.actions';

export const singleProductFeatureKey = 'singleProduct';

export interface SingleProductState {
  product: Product;
  relatedProducts: Product[];
  createReviewLoading: boolean;
}

export const initialState: SingleProductState = {
  product: undefined,
  relatedProducts: undefined,
  createReviewLoading: false,
};

export const reducer = createReducer(
  initialState,

  on(
    SingleProductActions.loadSingleProductPageSuccess,
    (state: SingleProductState, action) => ({ ...state, ...action.payload })
  ),
  on(
    SingleProductActions.createReview,
    (state: SingleProductState, action) => ({
      ...state,
      createReviewLoading: true,
    })
  ),
  on(
    SingleProductActions.createReviewSuccess,
    (state: SingleProductState, action) => {
      const product = deepCopy<Product>(state.product);
      product.reviews = action.payload.reviews;
      product.rating = action.payload.rating;
      product.ratingCount = action.payload.ratingCount;
      return { ...state, product, createReviewLoading: false };
    }
  )
);
