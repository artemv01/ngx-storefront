import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import {
  cartFeatureKey,
  initialState,
  loadCart,
  reducer,
} from '@app/cart-store';
import { TestUtilModule } from '@app/test-util/test-util.module';
import { StoreModule } from '@ngrx/store';

import { ViewCartComponent } from './view-cart.component';

const storeConfig: any = {};
storeConfig[cartFeatureKey] = reducer;

const cartContent = {
  '5f68523a4251e5e6aa229653': {
    _id: '5f68523a4251e5e6aa229653',
    image:
      'https://ngx-storefront-backend.s3.eu-west-2.amazonaws.com/d2caf5a7-47fb-4d49-be99-80982d38c6bb.jpg',
    name: 'Watch 001 Series',
    price: 93,
    quantity: 1,
  },
  '5f68523a4251e5e6aa229651': {
    _id: '5f68523a4251e5e6aa229651',
    image:
      'https://ngx-storefront-backend.s3.eu-west-2.amazonaws.com/02c1061c-1e8b-4292-b185-ccd46d750346.jpg',
    name: 'Watch 53 Series Unique',
    price: 103,
    quantity: 2,
  },
};
const totalPrice = 299;
const totalQuantity = 12;

const setTestingCart = () => {
  localStorage.setItem('cartContent', JSON.stringify(cartContent));
  localStorage.setItem('totalQuantity', JSON.stringify(totalQuantity));
  localStorage.setItem('totalPrice', JSON.stringify(totalPrice));
};

describe('ViewCartComponent', () => {
  let component: ViewCartComponent;
  let fixture: ComponentFixture<ViewCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewCartComponent],
      imports: [
        NoopAnimationsModule,
        TestUtilModule,
        RouterTestingModule,
        StoreModule.forRoot(storeConfig),
      ],
    }).compileComponents();

    setTestingCart();
    const readyCartState = reducer(initialState, loadCart());
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCartComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch delete item action', () => {});
});
