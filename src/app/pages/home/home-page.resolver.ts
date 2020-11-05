import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { LoadingService } from '@app/services/loading.service';
import { ProductsService } from '@app/services/products.service';
import { ReviewService } from '@app/services/review.service';
import { Store } from '@ngrx/store';
import { forkJoin, Observable } from 'rxjs';
import { filter, first, map, switchMap, tap } from 'rxjs/operators';
import { loadHomePage } from './store/home-page.actions';
import { HomePageState } from './store/home-page.reducer';
import { selectHomePageLoaded } from './store/home-page.selectors';

@Injectable({
  providedIn: 'root',
})
export class HomePageResolver implements Resolve<boolean> {
  constructor(
    private productQuery: ProductsService,
    private reviewQuery: ReviewService,
    private store: Store<HomePageState>,
    private loading: LoadingService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.store.select(selectHomePageLoaded).pipe(
      tap((isLoaded) =>
        !isLoaded ? this.store.dispatch(loadHomePage()) : null
      ),
      filter((loaded) => !!loaded),
      first()
    );
  }
}
