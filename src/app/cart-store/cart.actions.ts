import { CartState } from '@app/cart-store/cart.reducer';
import { Order } from '@app/models/order';
import { Product } from '@app/models/product';
import { ProductInCart } from '@app/models/product-in-cart';
import { UpdateItem } from '@app/models/update-item';
import { createAction, props } from '@ngrx/store';

export const loadCart = createAction('[Cart] Load Cart');
export const addItem = createAction(
  '[Cart] Add Item To Cart',
  props<{ payload: ProductInCart }>()
);
export const addItemReady = createAction(
  '[Cart] Add Item To Cart Ready',
  props<{ payload: CartState }>()
);
export const updateTotals = createAction('[Cart] Update Cart Totals');
export const updateTotalsReady = createAction(
  '[Cart] Update Cart Totals Ready',
  props<{ payload: CartState }>()
);

export const deleteOne = createAction(
  '[Cart] Delete One Cart Item',
  props<{ payload: string }>()
);
export const deleteOneReady = createAction(
  '[Cart] Delete One Cart Item Ready',
  props<{ payload: CartState }>()
);

export const updateOne = createAction(
  '[Cart] Update One Cart Item',
  props<{ payload: UpdateItem }>()
);
export const updateOneReady = createAction(
  '[Cart] Update One Cart Item Ready',
  props<{ payload: CartState }>()
);

export const cleanCart = createAction('[Cart] Clean Cart');
export const cleanCartReady = createAction(
  '[Cart] Clean Cart Ready',
  props<{ payload: Partial<CartState> }>()
);

export const createOrder = createAction(
  '[Checkout] Create Order',
  props<{ payload: Order }>()
);

export const orderCreated = createAction('[Checkout] Order Created');
export const resetOrderCreated = createAction('[Checkout] Reset Order Created');
