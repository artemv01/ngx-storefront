import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '@app/models/category';
import { CreateReviewResp } from '@app/models/create-review-resp';
import { Product } from '@app/models/product';
import { QueryItemsReq } from '@app/models/query-items-req';
import { QueryItemsResp } from '@app/models/query-items-resp';
import { CategoryService } from '@app/services/category.service';
import { LoadingService } from '@app/services/loading.service';
import { NotificationService } from '@app/services/notification.service';
import { ReviewService } from '@app/services/review.service';
import { TitleService } from '@app/services/title.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { forkJoin, of } from 'rxjs';
import {
  mergeMap,
  map,
  catchError,
  concatMap,
  tap,
  filter,
  switchMap,
} from 'rxjs/operators';
import { ShopState } from '.';
import { ProductsService } from '../services/products.service';
import * as ShopActions from './actions';

@Injectable()
export class ShopEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private productQuery: ProductsService,
    private reviewQuery: ReviewService,
    private categoryQuery: CategoryService,
    private loading: LoadingService,
    public notify: NotificationService,
    private titleServ: TitleService
  ) {}

  loadCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShopActions.loadCategories),
      tap(() => this.loading.show()),
      concatMap(() => this.categoryQuery.getMany()),
      map((payload: Category[]) =>
        ShopActions.loadCategoriesSuccess({ payload })
      ),
      tap(() => this.loading.hide()),
      catchError((error: HttpErrorResponse) => {
        return of(ShopActions.loadCategoriesFailure({ error }));
      })
    )
  );

  loadSearch$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ShopActions.loadSearch),
      switchMap((query: any) =>
        this.productQuery.getMany(query.payload as QueryItemsReq)
      ),

      map((payload: QueryItemsResp<Product>) => {
        const updateStore = {
          products: payload.items,
          pagesTotal: payload.pages,
          showPagination: payload.pages > 1 ? true : false,
          currentPage: payload.page,
          itemsTotal: payload.total,
        };
        return ShopActions.loadSearchSuccess({ payload: updateStore });
      }),
      catchError((error: HttpErrorResponse) => {
        return of(ShopActions.loadSearchFailure({ error }));
      })
    );
  });
}
