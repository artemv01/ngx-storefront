import { Product } from '@app/models/product';
import { deepCopy } from '@app/store/helpers';
import { Action, createReducer, on, State } from '@ngrx/store';
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
    (state: SingleProductState, action) => {
      const stateCopy = deepCopy<SingleProductState>(state);
      return { ...stateCopy, ...action.payload };
    }
  ),
  on(SingleProductActions.createReview, (state: SingleProductState, action) => {
    const stateCopy = deepCopy<SingleProductState>(state);
    stateCopy.createReviewLoading = true;
    return stateCopy;
  }),
  on(
    SingleProductActions.createReviewSuccess,
    (state: SingleProductState, action) => {
      const stateCopy = deepCopy<SingleProductState>(state);
      stateCopy.product.reviews = action.payload.reviews;
      stateCopy.product.rating = action.payload.rating;
      stateCopy.product.ratingCount = action.payload.ratingCount;
      stateCopy.createReviewLoading = false;
      return stateCopy;
    }
  )
);
