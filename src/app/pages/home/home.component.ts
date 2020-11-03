import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { Review } from 'src/app/models/review';
import { Category } from 'src/app/models/category';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { LoadingService } from '@app/services/loading.service';
import { TitleService } from '@app/services/title.service';
import { ProductsService } from '@app/services/products.service';
import { ReviewService } from '@app/services/review.service';
import { IHomePageState, ShopState } from '@app/store';
import { Store } from '@ngrx/store';
import { selectHomePageData } from '@app/store/selectors';
import { loadHomePage } from '@app/store/actions/actions';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  pageData$: Observable<IHomePageState>;
  constructor(private store: Store<ShopState>) {}
  topRated: Product[] = [];

  ngOnInit(): void {
    this.pageData$ = this.store.select(selectHomePageData);
  }

  addToCart() {}
}
