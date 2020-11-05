import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map, tap } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';

import { HttpErrorResponse } from '@angular/common/http';
import { CreateReviewResp } from '@app/models/create-review-resp';
import { LoadingService } from '@app/services/loading.service';
import { NotificationService } from '@app/services/notification.service';
import { ProductsService } from '@app/services/products.service';
import { ReviewService } from '@app/services/review.service';
import { TitleService } from '@app/services/title.service';
import { SingleProductState } from '@app/pages/single-product/store/single-product.reducer';
import * as SingleProductActions from '@app/pages/single-product/store/single-product.actions';

@Injectable()
export class SingleProductEffects {
  constructor(
    private actions$: Actions,
    private productQuery: ProductsService,
    private reviewQuery: ReviewService,
    private loading: LoadingService,
    public notify: NotificationService,
    private titleServ: TitleService
  ) {}

  loadSingleProductPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SingleProductActions.loadSingleProductPage),
      tap(() => this.loading.show()),
      concatMap(({ itemId }) =>
        forkJoin({
          product: this.productQuery.getOne(itemId),
          relatedProducts: this.productQuery.related(itemId),
        })
      ),
      tap((resp) => this.titleServ.set(resp.product.name)),
      map((payload: SingleProductState) =>
        SingleProductActions.loadSingleProductPageSuccess({ payload })
      ),
      tap(() => this.loading.hide()),
      catchError((error: HttpErrorResponse) => {
        return of(SingleProductActions.loadSingleProductPageFailure({ error }));
      })
    )
  );

  createReview$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SingleProductActions.createReview),
      concatMap((action) => this.reviewQuery.submit(action.payload)),
      map((payload: CreateReviewResp) =>
        SingleProductActions.createReviewSuccess({ payload })
      ),
      tap((resp) =>
        this.notify.push({ message: 'Your review has been submitted!' })
      ),
      catchError((error: HttpErrorResponse) =>
        of(SingleProductActions.createReviewFailure({ error }))
      )
    )
  );
}
