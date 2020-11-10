import { concatMap, map, tap, withLatestFrom } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Product } from '@app/models/product';
import { NotificationService } from '@app/services/notification.service';
import { OrderService } from '@app/services/order.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { State, Store } from '@ngrx/store';

import * as CartActions from './cart.actions';
import { CartState } from './cart.reducer';
import { selectCart, selectCartState } from './cart.selectors';
import { saveCartState } from './save-cart-state';
import { deepCopy } from '@app/store/helpers';
import { ProductInCart } from '@app/models/product-in-cart';

@Injectable()
export class CartEffects {
  constructor(
    private actions$: Actions,
    private store: Store<CartState>,
    private orderQuery: OrderService,
    public notify: NotificationService
  ) {}

  addItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.addItem),
      withLatestFrom(this.store.select(selectCart)),
      map(([action, cartState]: [any, CartState]) => {
        const cart = deepCopy(cartState);
        const product: ProductInCart = action.payload;
        if (cart.cartContent[product._id]) {
          const currentQuantity = cart.cartContent[product._id].quantity;

          cart.totalPrice -=
            cart.cartContent[product._id].price * currentQuantity;

          cart.cartContent[product._id].quantity += product.quantity;
          cart.totalPrice +=
            cart.cartContent[product._id].quantity *
            cart.cartContent[product._id].price;
          cart.totalQuantity += product.quantity;

          saveCartState(cart);
          return CartActions.addItemReady({ payload: cart });
        }
        cart.cartContent[product._id] = product;
        cart.totalPrice += product.quantity * product.price;
        cart.totalQuantity += product.quantity;
        saveCartState(cart);
        return CartActions.addItemReady({ payload: cart });
      }),
      tap(() =>
        this.notify.push({
          showMessage: 'addToCartSuccess',
        })
      )
    )
  );

  updateTotals$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.updateTotals),
      withLatestFrom(this.store.select(selectCart)),
      map(([payload, cartState]: [any, CartState]) => {
        let newTotal = 0;
        let newQuantity = 0;
        const cart = deepCopy(cartState);

        for (const [productId, product] of Object.entries(cart.cartContent)) {
          newTotal += product.price * product.quantity;
          newQuantity += product.quantity;
        }
        cart.totalPrice = newTotal;
        cart.totalQuantity = newQuantity;
        saveCartState(cart);
        return CartActions.updateTotalsReady({ payload: cart });
      })
    )
  );

  deleteOne$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.deleteOne),
      withLatestFrom(this.store.select(selectCart)),
      map(([{ payload: productId }, cartState]: [any, CartState]) => {
        const cart = deepCopy(cartState);
        const quantity = cart.cartContent[productId].quantity;
        const total =
          cart.cartContent[productId].price *
          cart.cartContent[productId].quantity;
        cart.totalPrice -= total;
        cart.totalQuantity -= quantity;

        delete cart.cartContent[productId];
        saveCartState(cart);
        return CartActions.deleteOneReady({ payload: cart });
      })
    )
  );

  updateOne$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.updateOne),
      withLatestFrom(this.store.select(selectCart)),
      map(
        ([
          {
            payload: { itemId, quantity },
          },
          cartState,
        ]: [any, CartState]) => {
          const cart = deepCopy(cartState);
          cart.cartContent[itemId].quantity = quantity;

          let newTotal = 0;
          let newQuantity = 0;
          for (const [productId, product] of Object.entries(cart.cartContent)) {
            newTotal += product.price * product.quantity;
            newQuantity += product.quantity;
          }
          cart.totalPrice = newTotal;
          cart.totalQuantity = newQuantity;

          saveCartState(cart);
          return CartActions.updateOneReady({ payload: cart });
        }
      )
    )
  );

  cleanCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.cleanCart),
      map(() => ({
        cartContent: {},
        totalPrice: 0,
        totalQuantity: 0,
      })),
      tap((update: Partial<CartState>) => {
        saveCartState(update);
      }),
      map((update: Partial<CartState>) =>
        CartActions.cleanCartReady({ payload: update })
      )
    )
  );

  createOrder$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CartActions.createOrder),
        map((payload: any) => this.orderQuery.create(payload.order)),
        tap(() => this.store.dispatch(CartActions.cleanCart())),
        tap(() => this.store.dispatch(CartActions.orderCreated()))
      ),
    {
      dispatch: false,
    }
  );
}
