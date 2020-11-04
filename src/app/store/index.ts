import { Product } from '@app/models/product';
import { Review } from '@app/models/review';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on,
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { ShopActions } from '@app/store/actions';
import { HttpErrorResponse } from '@angular/common/http';
import { Category } from '@app/models/category';
import { deepCopy } from './helpers';

export const featureKey = 'shop';

export interface IHomePageState {
  topRatedProducts: Product[];
  onSaleProducts: Product[];
  recentReviews: Review[];
}
export interface ISingleProductPageState {
  product: Product;
  relatedProducts: Product[];
  createReviewLoading: boolean;
}

export interface ShopState {
  singleProductPage: ISingleProductPageState;
  homePage: IHomePageState;
  categories: Category[];
  loaded: boolean;
  error: HttpErrorResponse;
}

export const initialState = {
  singleProductPage: {},
  homePage: {},
  categories: undefined,
  loaded: undefined,
  error: undefined,
};

export const reducers = createReducer(
  initialState,
  on(ShopActions.loadHomePageSuccess, (state: ShopState, action) => {
    const stateCopy = deepCopy<ShopState>(state);
    stateCopy.homePage = action.payload;
    stateCopy.loaded = true;
    return stateCopy;
  }),
  on(ShopActions.loadCategoriesSuccess, (state: ShopState, action) => {
    const stateCopy = deepCopy<ShopState>(state);
    stateCopy.categories = action.categories;
    return stateCopy;
  }),
  on(ShopActions.loadSingleProductPageSuccess, (state: ShopState, action) => {
    const stateCopy = deepCopy<ShopState>(state);
    stateCopy.singleProductPage = { ...action.payload };
    return stateCopy;
  }),
  on(ShopActions.createReview, (state: ShopState, action) => {
    const stateCopy = deepCopy<ShopState>(state);
    stateCopy.singleProductPage.createReviewLoading = true;
    return stateCopy;
  }),
  on(ShopActions.createReviewSuccess, (state: ShopState, action) => {
    const stateCopy = deepCopy<ShopState>(state);
    stateCopy.singleProductPage.product.reviews = action.payload.reviews;
    stateCopy.singleProductPage.product.rating = action.payload.rating;
    stateCopy.singleProductPage.product.ratingCount =
      action.payload.ratingCount;
    stateCopy.singleProductPage.createReviewLoading = false;
    return stateCopy;
  })
);

/* export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
 */
