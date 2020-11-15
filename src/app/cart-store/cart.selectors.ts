import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCart from './cart.reducer';

export const selectCartState = createFeatureSelector<fromCart.CartState>(
  fromCart.cartFeatureKey
);
export const selectCart = createSelector(
  selectCartState,
  (state: fromCart.CartState) => state
);
export const selectTotalQuantity = createSelector(
  selectCartState,
  (state: fromCart.CartState) => state.totalQuantity
);
export const selectTotalPrice = createSelector(
  selectCartState,
  (state: fromCart.CartState) => state.totalPrice
);

export const selectCartItems = createSelector(
  selectCartState,
  (state: fromCart.CartState) => state.cartContent
);
export const selectCartItemsMap = createSelector(
  selectCartState,
  (state: fromCart.CartState) => new Map(Object.entries(state.cartContent))
);

export const selectIsOrderCreated = createSelector(
  selectCartState,
  (state: fromCart.CartState) => state.orderCreated
);
export const selectOrderLoading = createSelector(
  selectCartState,
  (state: fromCart.CartState) => state.createOrderLoading
);

export const selectIsCartEmpty = createSelector(
  selectCartState,
  (state: fromCart.CartState) =>
    !state.cartContent || !Object.values(state.cartContent).length
);
