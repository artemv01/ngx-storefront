import { CartContent } from '@app/models/cart-content';
import { createReducer, on } from '@ngrx/store';
import * as CartActions from './cart.actions';

export const cartFeatureKey = 'cart';

export interface CartState {
  cartContent: CartContent;
  totalPrice: number;
  totalQuantity: number;
  orderCreated: boolean;
  createOrderLoading: boolean;
}

export const initialState: CartState = {
  cartContent: {},
  totalPrice: 0,
  totalQuantity: 0,
  orderCreated: false,
  createOrderLoading: false,
};

export const reducer = createReducer(
  initialState,

  on(
    CartActions.loadCart,
    (state: CartState): CartState => {
      let cartContent = localStorage.getItem('cartContent');
      let totalPrice = localStorage.getItem('totalPrice');
      let totalQuantity = localStorage.getItem('totalQuantity');
      const loadedCartState: Partial<CartState> = {
        cartContent: cartContent ? JSON.parse(cartContent) : {},
        totalPrice: totalPrice ? JSON.parse(totalPrice) : 0,
        totalQuantity: totalQuantity ? JSON.parse(totalQuantity) : 0,
      };
      return {
        ...state,
        ...loadedCartState,
      };
    }
  ),

  on(
    CartActions.addItemReady,
    (state: CartState, action): CartState => ({ ...state, ...action.payload })
  ),

  on(
    CartActions.updateTotalsReady,
    (state: CartState, action): CartState => ({ ...state, ...action.payload })
  ),
  /* 
  on(
    CartActions.updateOneReady,
    (state: CartState, action): CartState => {
      const sc: CartState = deepCopy(state);
      return { ...sc, ...action.payload };
    }
  ), */

  on(
    CartActions.deleteOneReady,
    (state: CartState, action): CartState => ({ ...state, ...action.payload })
  ),

  on(
    CartActions.cleanCartReady,
    (state: CartState, action): CartState => ({ ...state, ...action.payload })
  ),

  /* on(
    CartActions.cleanCart,
    (state: CartState): CartState => {
      const sc = deepCopy(state);

      return {
        ...sc,
        cartContent: {},
        totalPrice: 0,
        totalQuantity: 0,
      };
    }
  ), */
  on(CartActions.createOrder, (state) => ({
    ...state,
    createOrderLoading: true,
  })),
  on(CartActions.orderCreated, (state) => ({
    ...state,
    orderCreated: true,
    createOrderLoading: false,
  })),
  on(CartActions.resetOrderCreated, (state) => ({
    ...state,
    orderCreated: false,
  }))
);
