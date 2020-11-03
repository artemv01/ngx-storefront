import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '@app/models/category';
import { CreateReviewResp } from '@app/models/create-review-resp';
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
} from 'rxjs/operators';
import { IHomePageState, ISingleProductPageState } from '.';
import { Product } from '../models/product';
import { ProductsService } from '../services/products.service';
import { ShopActions } from './actions';

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

  homePageLoad$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShopActions.loadHomePage),
      tap(() => this.loading.show()),
      concatMap(() =>
        forkJoin({
          topRatedProducts: this.productQuery.onSale(),
          onSaleProducts: this.productQuery.topRated(),
          recentReviews: this.reviewQuery.recent(),
        })
      ),
      map((payload: IHomePageState) =>
        ShopActions.loadHomePageSuccess({ payload })
      ),
      tap(() => this.loading.hide()),
      catchError((error: HttpErrorResponse) => {
        return of(ShopActions.loadHomePageFailure({ error }));
      })
    )
  );

  loadCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShopActions.loadCategories),
      tap(() => this.loading.show()),
      concatMap(() => this.categoryQuery.getMany()),
      map((categories: Category[]) =>
        ShopActions.loadCategoriesSuccess({ categories })
      ),
      tap(() => this.loading.hide()),
      catchError((error: HttpErrorResponse) => {
        return of(ShopActions.loadCategoriesFailure({ error }));
      })
    )
  );

  loadSingleProductPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShopActions.loadSingleProductPage),
      tap(() => this.loading.show()),
      concatMap(({ itemId }) =>
        forkJoin({
          product: this.productQuery.getOne(itemId),
          relatedProducts: this.productQuery.related(itemId),
        })
      ),
      tap((resp) => this.titleServ.set(resp.product.name)),
      map((payload: ISingleProductPageState) =>
        ShopActions.loadSingleProductPageSuccess({ payload })
      ),
      tap(() => this.loading.hide()),
      catchError((error: HttpErrorResponse) => {
        return of(ShopActions.loadSingleProductPageFailure({ error }));
      })
    )
  );

  createReview$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShopActions.createReview),
      concatMap((action) => this.reviewQuery.submit(action.payload)),
      map((payload: CreateReviewResp) =>
        ShopActions.createReviewSuccess({ payload })
      ),
      tap((resp) =>
        this.notify.push({ message: 'Your review has been submitted!' })
      ),
      catchError((error: HttpErrorResponse) =>
        of(ShopActions.createReviewFailure({ error }))
      )
    )
  );
}
