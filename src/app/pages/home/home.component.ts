import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { Review } from 'src/app/models/review';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { HomePageState } from './store/home-page.reducer';
import {
  selectOnSaleProducts,
  selectRecentReviews,
  selectTopRatedProducts,
} from './store/home-page.selectors';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  topRated$: Observable<Product[]>;
  onSale$: Observable<Product[]>;
  reviews$: Observable<Review[]>;
  constructor(private store: Store<HomePageState>) {
    this.topRated$ = store.select(selectTopRatedProducts);
    this.onSale$ = store.select(selectOnSaleProducts);
    this.reviews$ = store.select(selectRecentReviews);
  }

  ngOnInit(): void {}

  addToCart() {}
}
