import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { deleteOne, updateTotals } from '@app/cart-store/cart.actions';
import { CartState } from '@app/cart-store/cart.reducer';
import {
  selectCartItems,
  selectCartItemsMap,
  selectIsCartEmpty,
  selectTotalPrice,
} from '@app/cart-store/cart.selectors';
import { cartInitialForTest } from '@app/cart-store/testing/cart-mocks';
import { CartContent } from '@app/models/cart-content';
import { ProductQuantity } from '@app/models/product-quantity';
import { NotificationService } from '@app/services/notification.service';
import { TitleService } from '@app/services/title.service';
import { GlobalState } from '@app/store';
import { click } from '@app/test-util/helpers';
import { TestUtilModule } from '@app/test-util/test-util.module';
import { MemoizedSelector } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { ViewCartComponent } from './view-cart.component';

describe('ViewCartComponent', () => {
  let component: ViewCartComponent;
  let fixture: ComponentFixture<ViewCartComponent>;

  let titleServiceSpy = jasmine.createSpyObj('TitleService', ['set']);
  let titleService: any;

  let notifyServiceSpy = jasmine.createSpyObj('NotificationService', [
    'push',
    'dismissAll',
  ]);
  let notifyService: any;

  let routerSpy = jasmine.createSpyObj('RouterService', ['navigate']);
  let router: any;

  let mockStore: MockStore<GlobalState>;
  let mockSelectIsCartEmpty: MemoizedSelector<CartState, boolean>;
  let mockSelectTotalPrice: MemoizedSelector<CartState, number>;
  let mockSelectCartItems: MemoizedSelector<CartState, CartContent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewCartComponent],
      imports: [TestUtilModule],
      providers: [
        { provide: TitleService, useValue: titleServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: NotificationService, useValue: notifyServiceSpy },
        provideMockStore(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewCartComponent);
    component = fixture.componentInstance;

    titleService = TestBed.inject(TitleService);
    notifyService = TestBed.inject(NotificationService);
    router = TestBed.inject(Router);

    mockStore = TestBed.inject(MockStore);
    mockStore.overrideSelector(selectIsCartEmpty, false);
    mockStore.overrideSelector(selectTotalPrice, cartInitialForTest.totalPrice);
    mockStore.overrideSelector(
      selectCartItemsMap,
      new Map(Object.entries(cartInitialForTest.cartContent))
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('sets the correct title', () => {
    const title = 'Your Cart';
    fixture.detectChanges();
    expect(titleService.set).toHaveBeenCalledWith(title);
  });

  it('redirects to checkout', () => {
    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.css('app-button'))?.nativeElement;
    expect(btn).toBeTruthy('cannot find redirect button');
    click(btn);
    const spy = router.navigate as jasmine.Spy;
    const args = spy.calls.first().args[0];
    expect(args).toEqual(['checkout']);
  });

  it('should dispatch delete item action', () => {
    const testId = '5f6852394251e5e6aa22964f';
    const dispatchSpy = spyOn(mockStore, 'dispatch');

    component.deleteItem(testId);
    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(deleteOne({ payload: testId }));
  });

  it('should dispatch update totals action', () => {
    const testData: ProductQuantity = { '5f6852394251e5e6aa22964f': 3 };
    const dispatchSpy = spyOn(mockStore, 'dispatch');

    component.updateTotals(testData);
    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(
      updateTotals({ payload: testData })
    );
  });
});
