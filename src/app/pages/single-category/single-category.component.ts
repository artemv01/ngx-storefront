import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  AfterViewChecked,
} from '@angular/core';
import { LoadingService } from '@app/services/loading.service';
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
export class SingleCategoryComponent
  implements OnInit, OnDestroy, AfterViewInit, AfterViewChecked {
  filtersChanged: Subject<any> = new Subject();
  destroy: Subject<any> = new Subject();
  itemsLoading = false;
  categoryName = '';
  pagesTotal = 0;
  currentPage = 0;
  itemsTotal = 0;
  products: any = [];
  showPagination: boolean;
  filterParams = {
    sortOrder: 'desc',
    sortType: 'ratingCount',
    search: '',
    categoryId: '',
    page: 1,
    limit: 2,
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

  constructor(
    public loading: LoadingService,
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

    console.log(
      'Component constructor',
      Object.getOwnPropertyDescriptor(this.filterParams, 'page')
    );
  }

  ngOnInit(): void {
    console.log(
      'Component on init',
      Object.getOwnPropertyDescriptor(this.filterParams, 'page')
    );
    this.route.paramMap.pipe(takeUntil(this.destroy)).subscribe((params) => {
      this.filterParams.categoryId = params.get('id');
      this.filterProducts();
    });
  }
  ngAfterViewInit() {
    console.log(
      'Component on after view init',
      Object.getOwnPropertyDescriptor(this.filterParams, 'page')
    );
  }
  ngAfterViewChecked() {
    console.log(
      'Component on after view checked',
      Object.getOwnPropertyDescriptor(this.filterParams, 'page')
    );
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
  filterProducts() {
    this.store.dispatch(
      SingleCategoryPageActions.loadPageData({ payload: this.filterParams })
    );
    /* this.itemsLoading = true;
    this.productQuery
      .getMany({
        ...this.filterParams,
        ...this.paginationParams,
      })
      .pipe(takeUntil(this.filtersChanged))
      .subscribe((searchResult) => {
        this.products = searchResult.items;
        this.pagesTotal = searchResult.pages;
        this.currentPage = searchResult.page;
        this.itemsTotal = searchResult.total;
        this.showPagination = searchResult.pages > 1 ? true : false;
        this.categoryName = searchResult.categoryName;
        this.titleServ.set(this.categoryName);

        this.loading.hide();
        this.itemsLoading = false;
      }); */
  }

  paginationChange(newPage: number) {
    console.log(Object.getOwnPropertyDescriptor(this.filterParams, 'page'));
    this.filterParams.page = newPage;
    this.filterProducts();
  }

  noticeChange(selected = '') {
    console.log(selected);
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
