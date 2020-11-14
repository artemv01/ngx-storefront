import { Observable, Subject } from 'rxjs';
import { debounceTime, delay, switchMap, takeUntil, tap } from 'rxjs/operators';

import {
  animate,
  query,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  NavigationStart,
  RouteConfigLoadEnd,
  RouteConfigLoadStart,
  Router,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { fadeAnimation } from '@app/core/animations';
import { Product } from '@app/models/product';
import { QueryItemsReq } from '@app/models/query-items-req';
import { AlertService } from '@app/services/alert.service';
import { NotificationService } from '@app/services/notification.service';
import { ProductsService } from '@app/services/products.service';
import { SearchService } from '@app/services/search.service';
import { GlobalState } from '@app/store';
import * as ShopActions from '@app/store/actions';
import {
  selectCurrentPage,
  selectItemsTotal,
  selectPagesTotal,
  selectProducts,
  selectSearchLoading,
  selectSearchMode,
  selectShowPagination,
} from '@app/store/selectors';

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
  destroy: Subject<any> = new Subject();
  routeChange$: Subject<null> = new Subject();

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

  products$: Observable<Product[]>;
  pagesTotal$: Observable<number>;
  currentPage$: Observable<number>;
  itemsTotal$: Observable<number>;
  showPagination$: Observable<boolean>;
  searchLoading$: Observable<boolean>;
  searchMode$: Observable<boolean>;

  constructor(
    public search: SearchService,
    public alertService: AlertService,
    private notify: NotificationService,
    private router: Router,
    private productQuery: ProductsService,
    private store: Store<GlobalState>
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.store.dispatch(ShopActions.loadingOffForce());
        this.store.dispatch(ShopActions.setSearchMode({ set: false }));
        this.notify.dismissAll();
        this.routeChange$.next(null);
      }
      if (event instanceof RouteConfigLoadStart) {
        this.store.dispatch(ShopActions.loadingOn());
      } else if (event instanceof RouteConfigLoadEnd) {
        this.store.dispatch(ShopActions.loadingOffForce());
      }
    });

    this.search.searchInput.valueChanges
      .pipe(
        debounceTime(500),
        tap((searchText) => {
          this.filterParams.page = 1;
          this.filterParams.search = searchText;
          this.store.dispatch(
            ShopActions.loadSearch({ payload: { ...this.filterParams } })
          );
        })
      )
      .subscribe();

    this.products$ = this.store.select(selectProducts);
    this.pagesTotal$ = this.store.select(selectPagesTotal);
    this.currentPage$ = this.store.select(selectCurrentPage);
    this.itemsTotal$ = this.store.select(selectItemsTotal);
    this.showPagination$ = this.store.select(selectShowPagination);
    this.searchMode$ = this.store.select(selectSearchMode);
    this.searchLoading$ = this.store.select(selectSearchLoading);
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
      ShopActions.loadSearch({ payload: { ...this.filterParams } })
    );
  }

  paginationChange(data: number) {
    this.filterParams.page = data;

    this.filterProducts();
  }

  onRouteActivate() {}

  prepareRoute(outlet) {
    return (
      outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation
    );
  }

  setSearchMode(set = true) {
    this.store.dispatch(ShopActions.setSearchMode({ set }));
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
