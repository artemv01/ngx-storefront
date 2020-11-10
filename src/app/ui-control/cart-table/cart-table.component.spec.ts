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
    (updateItem)="updateItem($event)"
  ></app-cart-table>`,
})
class TestHostComponent {
  cartItems$: Observable<CartState['cartContent']> = of(CART_CONTENT);
  updateItemEvent: UpdateItem;
  itemToDelete: Product['_id'];
  updateItem(payload: UpdateItem) {
    this.updateItemEvent = payload;
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
      imports: [NoopAnimationsModule, TestUtilModule],
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
    expect(rows).toBeTruthy('Rows were not found');
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
    expect(rows).toBeTruthy('Rows were not found');
    const deleteBtn = rows[0].querySelector('app-icon');
    click(deleteBtn);
    console.log(Object.keys(CART_CONTENT));
    expect(hostC.itemToDelete).toBe(Object.keys(CART_CONTENT)[0]);
  });
});
