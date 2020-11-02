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

export const featureKey = 'shop';

export interface IHomePageState {
  topRatedProducts: Product[];
  onSaleProducts: Product[];
  recentReviews: Review[];
}

export interface ShopState {
  homePage: IHomePageState;
  categories: Category[];
  loaded: boolean;
  error: HttpErrorResponse;
}

export const initialState = {
  homePage: {
    topRatedProducts: undefined,
    onSaleProducts: undefined,
    recentReviews: undefined,
  },
  categories: undefined,
  loaded: undefined,
  error: undefined,
};

export const reducers = createReducer(
  initialState,
  on(ShopActions.loadHomePageSuccess, (state, action) => ({
    ...state,
    homePage: {
      topRatedProducts: action.topRatedProducts,
      onSaleProducts: action.onSaleProducts,
      recentReviews: action.recentReviews,
    },
    loaded: true,
  })),
  on(ShopActions.loadCategoriesSuccess, (state, action) => ({
    ...state,
    categories: action.categories,
  }))
  /*  on(ShopActions.loadTopRatedProductsSuccess, (state, action) => ({
    ...state,
    topRatedProducts: action.products,
  })),
  on(ShopActions.loadOnSaleProductsSuccess, (state, action) => ({
    ...state,
    onSaleProducts: action.products,
  })),
  on(ShopActions.loadRecentReviewsSuccess, (state, action) => ({
    ...state,
    topRatedProducts: action.reviews,
  })) */
);

/* export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
 */
