import { Observable, of } from 'rxjs';

import {
  ComponentFixture,
  fakeAsync,
  flush,
  flushMicrotasks,
  TestBed,
  tick,
} from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import {
  addItem,
  cartFeatureKey,
  initialState,
  loadCart,
  reducer,
} from '@app/cart-store';
import * as CartMocks from '@app/cart-store/testing/cart-mocks';
import { TestUtilModule } from '@app/test-util/test-util.module';
import { provideMockActions } from '@ngrx/effects/testing';
import { Store, StoreModule } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';

import {
  addItemReady,
  cleanCart,
  cleanCartReady,
  createOrder,
  deleteOne,
  deleteOneReady,
  updateOne,
  updateOneReady,
} from '../cart.actions';
import { CartState } from '../cart.reducer';
import { getTestingCart, setTestingCart } from './cart-helpers';
import { CartEffects } from '../cart.effects';
import { OrderService } from '@app/services/order.service';

const storeConfig: any = {};
storeConfig[cartFeatureKey] = reducer;

describe('CartStore reducers', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        NoopAnimationsModule,
        TestUtilModule,
        RouterTestingModule,
        StoreModule.forRoot(storeConfig),
      ],
    }).compileComponents();
  });

  describe('CartStore reducers', () => {
    it('should return init state', () => {
      const initState = initialState;
      const newState = reducer(undefined, { type: '' });
      expect(newState).toEqual(initState);
    });

    it('loads value from localStorage', () => {
      setTestingCart();
      const loadedCartState = reducer(initialState, loadCart());

      expect(loadedCartState).toEqual(getTestingCart());
    });
  });
});

describe('CartStore effects', () => {
  const storeSpy = jasmine.createSpyObj('store', ['select', 'dispatch']);
  const orderServiceSpy = jasmine.createSpyObj('OrderService', ['create']);
  let store: any;
  let actions$: Observable<any>;
  let cartEffects: CartEffects;
  let orderService: OrderService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [NoopAnimationsModule, TestUtilModule, RouterTestingModule],
      providers: [
        CartEffects,
        provideMockActions(() => actions$),
        { provide: Store, useValue: storeSpy },
        { provide: OrderService, useValue: orderServiceSpy },
      ],
    }).compileComponents();

    store = TestBed.inject(Store);
    orderService = TestBed.inject(OrderService);
  });
  it('adds new cart items - addItem$', () => {
    const action = addItem({ payload: CartMocks.testAddItem.item });
    actions$ = hot('a', { a: action });

    const expected = addItemReady({ payload: CartMocks.testAddItem.result });
    const expected$ = cold('b', { b: expected });

    store.select.and.returnValue(of(CartMocks.cartInitialForTest));
    cartEffects = TestBed.inject(CartEffects);
    expect(cartEffects.addItem$).toBeObservable(expected$);

    expect(JSON.parse(localStorage.getItem('cartContent'))).toEqual(
      CartMocks.testAddItem.result.cartContent
    );
    expect(JSON.parse(localStorage.getItem('totalQuantity'))).toEqual(
      CartMocks.testAddItem.result.totalQuantity
    );
    expect(JSON.parse(localStorage.getItem('totalPrice'))).toEqual(
      CartMocks.testAddItem.result.totalPrice
    );
  });

  it('deletes one item - deleteOne$', () => {
    const action = deleteOne({ payload: CartMocks.testDeleteOne.item });
    actions$ = hot('a', { a: action });

    const expected = deleteOneReady({
      payload: CartMocks.testDeleteOne.result,
    });
    const expected$ = cold('b', { b: expected });

    store.select.and.returnValue(of(CartMocks.cartInitialForTest));
    cartEffects = TestBed.inject(CartEffects);
    expect(cartEffects.deleteOne$).toBeObservable(expected$);
    expect(JSON.parse(localStorage.getItem('cartContent'))).toEqual(
      CartMocks.testDeleteOne.result.cartContent
    );
    expect(JSON.parse(localStorage.getItem('totalQuantity'))).toEqual(
      CartMocks.testDeleteOne.result.totalQuantity
    );
    expect(JSON.parse(localStorage.getItem('totalPrice'))).toEqual(
      CartMocks.testDeleteOne.result.totalPrice
    );
  });

  it('updates one item - updateOne$', () => {
    const action = updateOne({ payload: CartMocks.testUpdateOne.item });
    actions$ = hot('a', { a: action });

    const expected = updateOneReady({
      payload: CartMocks.testUpdateOne.result,
    });
    const expected$ = cold('b', { b: expected });

    store.select.and.returnValue(of(CartMocks.cartInitialForTest));
    cartEffects = TestBed.inject(CartEffects);
    expect(cartEffects.updateOne$).toBeObservable(expected$);
    expect(JSON.parse(localStorage.getItem('cartContent'))).toEqual(
      CartMocks.testUpdateOne.result.cartContent
    );
    expect(JSON.parse(localStorage.getItem('totalQuantity'))).toEqual(
      CartMocks.testUpdateOne.result.totalQuantity
    );
    expect(JSON.parse(localStorage.getItem('totalPrice'))).toEqual(
      CartMocks.testUpdateOne.result.totalPrice
    );
  });

  it('cleans cart - cleanCart$', () => {
    const action = cleanCart();
    actions$ = hot('a', { a: action });

    const expected = cleanCartReady({
      payload: CartMocks.testCleanCart.result,
    });
    const expected$ = cold('b', { b: expected });

    store.select.and.returnValue(of(CartMocks.cartInitialForTest));
    cartEffects = TestBed.inject(CartEffects);
    expect(cartEffects.cleanCart$).toBeObservable(expected$);
    expect(JSON.parse(localStorage.getItem('cartContent'))).toEqual(
      CartMocks.testCleanCart.result.cartContent
    );
    expect(JSON.parse(localStorage.getItem('totalQuantity'))).toEqual(
      CartMocks.testCleanCart.result.totalQuantity
    );
    expect(JSON.parse(localStorage.getItem('totalPrice'))).toEqual(
      CartMocks.testCleanCart.result.totalPrice
    );
  });

  /*  it('creates order - createOrder$', () => {
    const action = createOrder({ payload: CartMocks.testCreateOrder.item });
    actions$ = hot('a', { a: action });
    cartEffects = TestBed.inject(CartEffects);
    cartEffects.createOrder$.subscribe();
    expect(orderService.create).toHaveBeenCalled();
    expect(orderService.create).toHaveBeenCalledWith(
      CartMocks.testCreateOrder.item
    );
  }); */
});
