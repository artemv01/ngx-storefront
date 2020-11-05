import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { Review } from 'src/app/models/review';
import { Category } from 'src/app/models/category';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { LoadingService } from '@app/services/loading.service';
import { TitleService } from '@app/services/title.service';
import { ProductsService } from '@app/services/products.service';
import { ReviewService } from '@app/services/review.service';
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
