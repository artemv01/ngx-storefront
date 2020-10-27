import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoadingService } from '@app/service/loading.service';
import {
  transition,
  style,
  animate,
  trigger,
  state,
} from '@angular/animations';

import { SearchService } from '@app/service/search.service';
import { ApiService } from '@app/service/api.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { PaginationParams } from '@app/type/pagination-params';
import { ProductFilterQuery } from '@app/type/product-filter-query';
import { Category } from '@app/type/category';
import { ActivatedRoute } from '@angular/router';
import { TitleService } from '@app/service/title.service';

@Component({
  selector: 'app-single-category',
  templateUrl: './single-category.component.html',
  styleUrls: ['./single-category.component.scss'],

  animations: [
    /*  trigger('loadingScreen', [
      state('in', style({ opacity: 1 })),

      transition(':enter', [style({ opacity: 0 }), animate(200)]),

      transition(':leave', animate(200, style({ opacity: 0 }))),
    ]), */
    trigger('loadingScreen', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [style({ opacity: 0 }), animate(600)]),
      transition(':leave', animate(500, style({ opacity: 0 }))),
    ]),
  ],
})
export class SingleCategoryComponent implements OnInit, OnDestroy {
  filtersChanged: Subject<any> = new Subject();
  destroy: Subject<any> = new Subject();
  itemsLoading = false;
  categoryName = '';
  pagesTotal = 0;
  currentPage = 0;
  itemsTotal = 0;
  products: any = [];
  showPagination: boolean;
  filterParams: ProductFilterQuery = {
    sortOrder: 'desc',
    sortType: 'ratingCount',
    search: '',
    categoryId: '',
  };
  paginationParams: PaginationParams = {
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

  constructor(
    public loading: LoadingService,
    public search: SearchService,
    public api: ApiService,
    private route: ActivatedRoute,
    private titleServ: TitleService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntil(this.destroy)).subscribe((params) => {
      this.filterParams.categoryId = params.get('id');
      this.loading.show();
      this.filterProducts();
    });
  }
  sortBy(key: string, order = 'desc') {
    this.filterParams.sortType = key;
    this.filterParams.sortOrder = order;
    this.filtersChanged.next(null);
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
        this.sortBy('price', 'asc');
        break;
      case 'Sort by price (from high to low)':
        this.sortBy('price', 'desc');
        break;
    }
  }
  filterProducts() {
    this.itemsLoading = true;
    this.api
      .getProductsFiltered({
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
      });
  }

  paginationChange(newPage: number) {
    this.paginationParams.page = newPage;
    this.filtersChanged.next(null);

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
