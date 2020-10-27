import { Subject } from 'rxjs';
import { debounceTime, switchMap, takeUntil, tap, delay } from 'rxjs/operators';

import {
  animate,
  query,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlertService } from '@app/service/alert.service';
import { ApiService } from '@app/service/api.service';
import { LoadingService } from '@app/service/loading.service';
import { SearchService } from '@app/service/search.service';
import { Category } from '@app/type/category';
import { PaginationParams } from '@app/type/pagination-params';
import { ProductFilterQuery } from '@app/type/product-filter-query';
import {
  NavigationStart,
  RouteConfigLoadEnd,
  RouteConfigLoadStart,
  Router,
} from '@angular/router';
import { NotificationService } from '@app/service/notification.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],

  animations: [
    trigger('routeAnimation', [
      transition('* => *', [
        style({ position: 'relative', height: '100vh', overflow: 'hidden' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
          }),
        ]),
        query(':enter', [style({ opacity: 0 })], { optional: true }),

        query(
          ':leave',
          [
            style({ opacity: 1 }),
            animate('0.2s ease-in-out', style({ opacity: 0 })),
          ],
          { optional: true }
        ),

        query(
          ':enter',
          [
            style({ opacity: 0 }),
            animate('0.2s ease-in-out', style({ opacity: 1 })),
          ],
          { optional: true }
        ),
      ]),
    ]),
    trigger('modalBg', [
      transition(':enter', [
        style({ opacity: 0, display: 'flex' }),
        animate('100ms', style({ opacity: 0.6 })),
      ]),
      transition(':leave', [
        animate('100ms', style({ opacity: 0 })),
        style({ display: 'none' }),
      ]),
    ]),
    trigger('modalWindow', [
      transition(':enter', [
        style({ opacity: 0, display: 'flex' }),
        animate('100ms', style({ opacity: 0.6 })),
      ]),
      transition(':leave', [
        animate('100ms', style({ opacity: 0 })),
        style({ display: 'none' }),
      ]),
    ]),
    trigger('loadingScreen', [
      state('in', style({ opacity: 1 })),

      transition(':enter', [style({ opacity: 0 }), animate(200)]),

      transition(':leave', animate(200, style({ opacity: 0 }))),
    ]),
  ],
})
export class ShopComponent implements OnInit, OnDestroy {
  filtersChanged: Subject<any> = new Subject();
  destroy: Subject<any> = new Subject();
  routeChange$: Subject<null> = new Subject();
  searchLoading = true;
  searchMode = false;
  searchText = '';
  pagesTotal = 0;
  currentPage = 0;

  products: any = [];
  showPagination: boolean;
  filterParams: ProductFilterQuery = {
    sortOrder: 'desc',
    sortType: 'ratingCount',
    search: '',
  };
  paginationParams: PaginationParams = {
    page: 1,
    limit: 9,
  };
  itemsTotal = 0;

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
    public alertService: AlertService,
    private notify: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.loading.forceHide();
        this.searchMode = false;
        this.notify.dismissAll();
        this.routeChange$.next(null);
      }
      if (event instanceof RouteConfigLoadStart) {
        this.loading.show();
      } else if (event instanceof RouteConfigLoadEnd) {
        this.loading.forceHide();
      }
    });

    this.search.searchInput.valueChanges
      .pipe(
        debounceTime(500),
        tap(() => {
          this.searchMode = true;
          this.searchLoading = true;
        }),
        switchMap((searchText) => {
          this.paginationParams.page = 1;
          this.filterParams.search = searchText;
          return this.api
            .getProductsFiltered({
              ...this.filterParams,
              ...this.paginationParams,
            })
            .pipe(takeUntil(this.filtersChanged), delay(2000));
        })
      )
      .pipe(takeUntil(this.destroy))

      .subscribe((searchResult) => {
        this.products = searchResult.items;
        this.pagesTotal = searchResult.pages;
        this.currentPage = searchResult.page;
        this.itemsTotal = searchResult.total;
        if (searchResult.pages > 1) {
          this.showPagination = true;
        } else {
          this.showPagination = false;
        }
        this.searchLoading = false;
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
    this.searchLoading = true;
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
        if (searchResult.pages > 1) {
          this.showPagination = true;
        } else {
          this.showPagination = false;
        }
        this.searchLoading = false;
      });
  }

  paginationChange(data: number) {
    this.paginationParams.page = data;
    this.filtersChanged.next(null);

    this.filterProducts();
  }

  cancelSearch() {
    this.searchMode = false;
  }

  onRouteActivate() {}

  prepareRoute(outlet) {
    return (
      outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation
    );
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
