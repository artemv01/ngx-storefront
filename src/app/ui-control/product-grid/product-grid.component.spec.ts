import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductGridComponent } from './product-grid.component';
import { Component, ViewChild } from '@angular/core';
import { Product } from '@app/type/product';
import { By } from '@angular/platform-browser';
import { ButtonComponent } from '../button/button.component';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { SaleLabelComponent } from '../sale-label/sale-label.component';

@Component({
  selector: 'host-component',
  template: '<app-product-grid [products]="products"></app-product-grid>',
})
class HostComponent {
  products: Product[] = [
    {
      _id: '5f377dd002a5ae2bda8d806a',
      ratingCount: 3,
      rating: 2.5833333333333335,
      onSale: true,
      salePrice: 543,
      price: 999,
      name: 'Monitor Dell Xjq123',
      description: '',
      image: 'e362e413c6322aae8208a6241331d3d1.jpg',
      reviews: [],
    },
    {
      _id: '5f377df602a5ae2bda8d806b',
      ratingCount: 5,
      rating: 3,
      onSale: true,
      salePrice: 600,
      price: 753.23,
      name: 'HyperX RAM Memory',
      description: '',
      image: '6c6c2cadc294d63ada074a8d54cd42e3.jpg',
      reviews: [],
    },
    {
      _id: '5f377e1a02a5ae2bda8d806c',
      ratingCount: 3,
      rating: 0.16666666666666666,
      onSale: true,
      salePrice: 899.99,
      price: 1200.11,
      name: 'AMD Processor',
      description: '',
      image: 'f103810292385e5109472e1fda9fe1a694.jpg',
      reviews: [],
    },
  ];
}

fdescribe('ProductGridComponent', () => {
  //   let component: ProductGridComponent;
  //   let fixture: ComponentFixture<ProductGridComponent>;
  let hostComponent: HostComponent;
  let hcFixture: ComponentFixture<HostComponent>;
  let testComponent: ProductGridComponent | any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ButtonComponent,
        StarRatingComponent,
        SaleLabelComponent,
        ProductGridComponent,
        HostComponent,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    hcFixture = TestBed.createComponent(HostComponent);
    hostComponent = hcFixture.componentInstance;
    hcFixture.detectChanges();
  });

  it('should create', () => {
    expect(hostComponent).toBeTruthy();
  });

  it('should show view cart when add to cart btn has been clicked', () => {
    const testComponent: ProductGridComponent = hcFixture.debugElement.query(
      By.css('app-product-grid')
    )?.componentInstance;

    const addToCartBtn: any = hcFixture.debugElement.query(By.css('c-button'))
      .componentInstance;
    expect(addToCartBtn).toBeTruthy();

    expect(Object.keys(testComponent.addedToCart).length).toBe(0);
    addToCartBtn.onClick.emit(null);
    expect(Object.keys(testComponent.addedToCart).length).toBe(1);
  });
});
