import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ReviewService } from '@app/services/review.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { forkJoin, of } from 'rxjs';
import { mergeMap, map, catchError, concatMap } from 'rxjs/operators';
import { IHomePageState } from '.';
import { Product } from '../models/product';
import { ProductsService } from '../services/products.service';
import { ShopActions } from './actions';

@Injectable()
export class ShopEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private productQuery: ProductsService,
    private reviewQuery: ReviewService
  ) {}

  homePageLoad$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShopActions.loadHomePage),
      concatMap(() =>
        forkJoin({
          topRatedProducts: this.productQuery.onSale(),
          onSaleProducts: this.productQuery.topRated(),
          recentReviews: this.reviewQuery.recent(),
        })
      ),
      map((resp: IHomePageState) => ShopActions.loadHomePageSuccess(resp)),
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        return of(ShopActions.loadHomePageFailure({ error }));
      })
    )
  );
  /*  getOnSaleProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShopActions.loadOnSaleProducts),
      concatMap(() => this.productQuery.onSale()),
      map((products) => ShopActions.loadOnSaleProductsSuccess({ products })),
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        return of(ShopActions.loadOnSaleProductsFailure({ error }));
      })
    )
  );
  getRecentReviews$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShopActions.loadRecentReviews),
      concatMap(() => this.productQuery.topRated()),
      map((reviews) => ShopActions.loadRecentReviewsSuccess({ reviews })),
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        return of(ShopActions.loadRecentReviewsFailure({ error }));
      })
    )
  ); */
}
