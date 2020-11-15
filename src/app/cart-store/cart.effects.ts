import {
  catchError,
  concatMap,
  delay,
  map,
  tap,
  withLatestFrom,
} from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Product } from '@app/models/product';
import { NotificationService } from '@app/services/notification.service';
import { OrderService } from '@app/services/order.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { State, Store } from '@ngrx/store';

import * as CartActions from './cart.actions';
import { CartState } from './cart.reducer';
import { selectCart, selectCartItems, selectCartState } from './cart.selectors';
import { saveCartState } from './save-cart-state';
import { deepCopy } from '@app/store/helpers';
import { ProductInCart } from '@app/models/product-in-cart';
import { ProductQuantity } from '@app/models/product-quantity';
import { CartContent } from '@app/models/cart-content';
import { HttpErrorResponse } from '@angular/common/http';
import { setError } from '@app/store/actions';
import { of } from 'rxjs';

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
        const content = deepCopy(cartState.cartContent);
        let totalPrice = cartState.totalPrice;
        let totalQuantity = cartState.totalQuantity;
        const product: ProductInCart = action.payload;
        if (content[product._id]) {
          const currentQuantity = content[product._id].quantity;

          totalPrice -= content[product._id].price * currentQuantity;

          content[product._id].quantity += product.quantity;
          totalPrice +=
            content[product._id].quantity * content[product._id].price;
          totalQuantity += product.quantity;
        } else {
          content[product._id] = product;
          totalPrice += product.quantity * product.price;
          totalQuantity += product.quantity;
        }

        const newCart = {
          cartContent: content,
          totalPrice,
          totalQuantity,
        };

        saveCartState(newCart);
        return CartActions.addItemReady({ payload: newCart });
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
      withLatestFrom(this.store.select(selectCartItems)),
      map(
        ([action, cartContent]: [
          { payload: ProductQuantity },
          CartContent
        ]) => {
          const cart = deepCopy(cartContent);
          for (const [productId, quantity] of Object.entries(action.payload)) {
            cart[productId].quantity = quantity;
          }

          let newTotal = 0;
          let newQuantity = 0;

          for (const [productId, product] of Object.entries(cart)) {
            newTotal += product.price * product.quantity;
            newQuantity += product.quantity;
          }
          const cartUpdates: Partial<CartState> = {
            cartContent: cart,
            totalPrice: newTotal,
            totalQuantity: newQuantity,
          };
          saveCartState(cartUpdates);
          return CartActions.updateTotalsReady({ payload: cartUpdates });
        }
      )
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

  /*  updateOne$ = createEffect(() =>
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
  ); */

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
        tap((action: any) => console.log(action.payload)),

        map((action) => this.orderQuery.create(action.payload)),
        catchError((error: HttpErrorResponse) => of(setError({ error }))),

        tap(() => this.store.dispatch(CartActions.cleanCart())),
        tap(() => this.store.dispatch(CartActions.orderCreated()))
      ),
    {
      dispatch: false,
    }
  );
}
