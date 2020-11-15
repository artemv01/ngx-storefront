import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map, tap } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';

import * as HomePageStateActions from './home-page.actions';
import { ReviewService } from '@app/services/review.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductsService } from '@app/services/products.service';
import { HomePageState } from './home-page.reducer';
import { GlobalState } from '@app/store';
import { Store } from '@ngrx/store';
import { loadingOff, loadingOn, setError } from '@app/store/actions';

@Injectable()
export class HomePageStateEffects {
  homePageLoad$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HomePageStateActions.loadHomePage),
      tap(() => setTimeout(() => this.store.dispatch(loadingOn()))),
      concatMap(() =>
        forkJoin({
          topRatedProducts: this.productQuery.onSale(),
          onSaleProducts: this.productQuery.topRated(),
          recentReviews: this.reviewQuery.recent(),
        })
      ),
      map((payload: HomePageState) =>
        HomePageStateActions.loadHomePageSuccess({ payload })
      ),
      tap(() => setTimeout(() => this.store.dispatch(loadingOff()))),
      catchError((error: HttpErrorResponse) => of(setError({ error })))
    )
  );

  constructor(
    private actions$: Actions,
    private reviewQuery: ReviewService,
    private productQuery: ProductsService,
    private store: Store<GlobalState>
  ) {}
}
