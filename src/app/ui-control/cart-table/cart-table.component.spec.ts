import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CartState } from '@app/cart-store/cart.reducer';
import { click } from '@app/test-util/helpers';
import { Product } from '@app/models/product';
import { UpdateItem } from '@app/models/update-item';
import { from, Observable, of } from 'rxjs';
import { IconComponent } from '../icon/icon.component';

import { CartTableComponent } from './cart-table.component';
import { TestUtilModule } from '@app/test-util/test-util.module';
import { ProductQuantity } from '@app/models/product-quantity';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';

const CART_CONTENT: CartState['cartContent'] = {
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

@Component({
  template: `<app-cart-table
    [cartItems$]="cartItems$"
    (deleteItem)="deleteItem($event)"
    (updateCart)="updateCart($event)"
  ></app-cart-table>`,
})
class TestHostComponent {
  cartItems$: Observable<CartState['cartContent']> = of(CART_CONTENT);
  updateCartData: ProductQuantity;
  itemToDelete: Product['_id'];
  updateCart(payload: ProductQuantity) {
    this.updateCartData = payload;
  }
  deleteItem(id: Product['_id']) {
    this.itemToDelete = id;
  }
}

describe('CartTableComponent', () => {
  let component: CartTableComponent;
  let fixture: ComponentFixture<CartTableComponent>;
  let hostF: ComponentFixture<TestHostComponent>;
  let hostC: TestHostComponent;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartTableComponent, TestHostComponent, IconComponent],
      imports: [
        NoopAnimationsModule,
        TestUtilModule,
        RouterTestingModule,
        FormsModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartTableComponent);
    component = fixture.componentInstance;
    hostF = TestBed.createComponent(TestHostComponent);
    hostC = hostF.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the table', () => {
    hostF.detectChanges();
    let rows = hostF.nativeElement.querySelectorAll(
      '.cart-items-table tbody tr'
    );
    expect(rows.length).toBe(
      Object.keys(CART_CONTENT).length,
      'Wrong number of rows'
    );
  });

  it('should delete the right item', () => {
    hostF.detectChanges();
    let rows = hostF.nativeElement.querySelectorAll(
      '.cart-items-table tbody tr'
    );
    expect(rows.length).toBeTruthy('Rows were not found');
    const deleteBtn = rows[0].querySelector('app-icon');
    click(deleteBtn);
    expect(hostC.itemToDelete).toBe(Object.keys(CART_CONTENT)[0]);
  });

  it('should update items quantities', () => {
    const expected = {
      '5f68523a4251e5e6aa229653': 9,
    };
    hostF.detectChanges();

    const updateBtn = hostF.debugElement.query(By.css('.update-totals-btn'));
    expect(updateBtn).toBeTruthy();

    let rows = hostF.debugElement.queryAll(
      By.css('.cart-items-table tbody tr')
    );
    expect(rows.length).toBeTruthy('Rows were not found');
    const input: HTMLInputElement = rows[0].nativeElement.querySelector(
      'input[name=quantity]'
    );
    expect(input).toBeTruthy('Input was not found');

    input.value = '9';

    input.dispatchEvent(new Event('change'));
    hostF.detectChanges();
    click(updateBtn);
    console.log(expected);
    expect(hostC.updateCartData).toEqual(expected);
  });
});
