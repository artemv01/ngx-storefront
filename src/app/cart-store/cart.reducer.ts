import { Product } from '@app/models/product';
import { deepCopy } from '@app/store/helpers';
import { Action, createReducer, on } from '@ngrx/store';
import * as CartActions from './cart.actions';
import { saveCartState } from './save-cart-state';

export const cartFeatureKey = 'cart';

export interface CartState {
  cartContent: Record<Product['_id'], Product>;
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
      const sc = deepCopy(state);
      let cartContent = localStorage.getItem('cartContent');
      let totalPrice = localStorage.getItem('totalPrice');
      let totalQuantity = localStorage.getItem('totalQuantity');
      const cartState: Partial<CartState> = {
        cartContent: cartContent ? JSON.parse(cartContent) : {},
        totalPrice: totalPrice ? JSON.parse(totalPrice) : 0,
        totalQuantity: totalQuantity ? JSON.parse(totalQuantity) : 0,
      };
      return {
        ...sc,
        ...cartState,
      };
    }
  ),

  on(
    CartActions.addItemReady,
    (state: CartState, action): CartState => {
      const sc: CartState = deepCopy(state);
      return { ...sc, ...action.payload };
    }
  ),

  on(
    CartActions.updateTotalsReady,
    (state: CartState, action): CartState => {
      const sc: CartState = deepCopy(state);
      return { ...sc, ...action.payload };
    }
  ),

  on(
    CartActions.updateOneReady,
    (state: CartState, action): CartState => {
      const sc: CartState = deepCopy(state);
      return { ...sc, ...action.payload };
    }
  ),

  on(
    CartActions.deleteOneReady,
    (state: CartState, action): CartState => {
      const sc: CartState = deepCopy(state);
      return { ...sc, ...action.payload };
    }
  ),

  on(
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
  ),
  on(CartActions.createOrder, (state) => {
    const sc = deepCopy(state);
    return { ...sc, createOrderLoading: true };
  }),
  on(CartActions.orderCreated, (state) => {
    const sc = deepCopy(state);
    return { ...sc, orderCreated: true, createOrderLoading: false };
  }),
  on(CartActions.resetOrderCreated, (state) => {
    const sc = deepCopy(state);
    return { ...sc, orderCreated: false };
  })
);
