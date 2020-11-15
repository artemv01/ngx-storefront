import {
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';
import {
  transition,
  style,
  animate,
  trigger,
  state,
} from '@angular/animations';

import { SearchService } from '@app/services/search.service';
import { takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { Category } from '@app/models/category';
import { ActivatedRoute } from '@angular/router';
import { TitleService } from '@app/services/title.service';
import { ProductsService } from '@app/services/products.service';
import { SingleCategoryPageState } from './store/single-category-page.reducer';
import { Store } from '@ngrx/store';
import {
  selectCategoryName,
  selectCurrentPage,
  selectItemsTotal,
  selectLoading,
  selectPagesTotal,
  selectProducts,
  selectShowPagination,
} from './store/single-category-page.selectors';
import * as SingleCategoryPageActions from './store/single-category-page.actions';

import { Product } from '@app/models/product';
import { QueryItemsReq } from '@app/models/query-items-req';

@Component({
  selector: 'app-single-category',
  templateUrl: './single-category.component.html',
  styleUrls: ['./single-category.component.scss'],

  animations: [
    trigger('loadingScreen', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [style({ opacity: 0 }), animate(600)]),
      transition(':leave', animate(500, style({ opacity: 0 }))),
    ]),
  ],
})
export class SingleCategoryComponent implements OnInit, OnDestroy {
  destroy: Subject<any> = new Subject();
  filterParams: QueryItemsReq = {
    sortOrder: 'desc',
    sortType: 'ratingCount',
    search: '',
    page: 1,
    limit: 9,
  };

  selSortType = 'Sort by popularity';
  actions = [
    'Sort by popularity',
    'Sort by rating',
    'Sort by price (from low to high)',
    'Sort by price (from high to low)',
  ];

  allCategories: Category[] = [];

  products$: Observable<Product[]>;
  pagesTotal$: Observable<number>;
  currentPage$: Observable<number>;
  itemsTotal$: Observable<number>;
  showPagination$: Observable<boolean>;
  categoryName$: Observable<string>;
  itemsLoading$: Observable<boolean>;

  constructor(
    public search: SearchService,
    private route: ActivatedRoute,
    private titleServ: TitleService,
    private productQuery: ProductsService,
    private store: Store<SingleCategoryPageState>
  ) {
    this.products$ = store.select(selectProducts);
    this.pagesTotal$ = store.select(selectPagesTotal);
    this.currentPage$ = store.select(selectCurrentPage);
    this.itemsTotal$ = store.select(selectItemsTotal);
    this.showPagination$ = store.select(selectShowPagination);
    this.categoryName$ = store.select(selectCategoryName);
    this.itemsLoading$ = store.select(selectLoading);
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntil(this.destroy)).subscribe((params) => {
      this.filterParams.categoryId = params.get('id');
      this.filterProducts(true);
    });
  }

  sortBy(key: string, order = 'desc') {
    this.filterParams.sortType = key;
    this.filterParams.sortOrder = order;
    this.filterProducts();
  }
  sort(key: string) {
    switch (key) {
      case 'Sort by popularity':
        this.sortBy('ratingCount');
        break;
      case 'Sort by rating':
        this.sortBy('rating');
        break;
      case 'Sort by price (from low to high)':
        this.sortBy('_price', 'asc');
        break;
      case 'Sort by price (from high to low)':
        this.sortBy('_price', 'desc');
        break;
    }
  }
  filterProducts(firstPageLoading = false) {
    this.store.dispatch(
      SingleCategoryPageActions.loadPageData({
        payload: { ...this.filterParams },
        pageLoading: firstPageLoading,
      })
    );
  }

  paginationChange(newPage: number) {
    this.filterParams.page = newPage;
    this.filterProducts();
  }

  scrollToElement($element): void {
    $element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  }
  ngOnDestroy() {
    this.destroy.next(null);
  }
}
