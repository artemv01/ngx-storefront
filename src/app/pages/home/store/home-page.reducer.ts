import { Product } from '@app/models/product';
import { Review } from '@app/models/review';
import { createReducer, on } from '@ngrx/store';
import * as HomePageStateActions from './home-page.actions';

export const homePageStateFeatureKey = 'homePageState';

export interface HomePageState {
  topRatedProducts: Product[];
  onSaleProducts: Product[];
  recentReviews: Review[];
  loaded: boolean;
}

export const initialState: HomePageState = {
  topRatedProducts: undefined,
  onSaleProducts: undefined,
  recentReviews: undefined,
  loaded: false,
};

export const reducer = createReducer(
  initialState,

  on(
    HomePageStateActions.loadHomePageSuccess,
    (state: HomePageState, action) => ({
      ...state,
      ...action.payload,
      loaded: true,
    })
  )
);
