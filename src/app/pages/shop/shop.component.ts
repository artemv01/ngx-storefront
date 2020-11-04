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
import { AlertService } from '@app/services/alert.service';
import { LoadingService } from '@app/services/loading.service';
import { SearchService } from '@app/services/search.service';
import { Category } from '@app/models/category';
import {
  NavigationStart,
  RouteConfigLoadEnd,
  RouteConfigLoadStart,
  Router,
} from '@angular/router';
import { NotificationService } from '@app/services/notification.service';
import { ProductsService } from '@app/services/products.service';
import { QueryItemsReq } from '@app/models/query-items-req';
import { fadeAnimation } from '@app/core/animations';

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

    fadeAnimation,
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
  filterParams: QueryItemsReq = {
    sortOrder: 'desc',
    sortType: 'ratingCount',
    search: '',
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
    public alertService: AlertService,
    private notify: NotificationService,
    private router: Router,
    private productQuery: ProductsService
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
          this.filterParams.page = 1;
          this.filterParams.search = searchText;
          return this.productQuery
            .getMany({
              ...this.filterParams,
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
        this.sortBy('_price', 'asc');
        break;
      case 'Sort by price (from high to low)':
        this.sortBy('_price', 'desc');
        break;
    }
  }
  filterProducts() {
    this.searchLoading = true;
    this.productQuery
      .getMany({
        ...this.filterParams,
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
    this.filterParams.page = data;
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
