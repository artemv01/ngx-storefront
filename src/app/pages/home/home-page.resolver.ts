import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { LoadingService } from '@app/services/loading.service';
import { ProductsService } from '@app/services/products.service';
import { ReviewService } from '@app/services/review.service';
import { ShopState } from '@app/store';
import { ShopActions } from '@app/store/actions';
import { loadHomePage } from '@app/store/actions/actions';
import { selectIsLoaded } from '@app/store/selectors';
import { Store } from '@ngrx/store';
import { forkJoin, Observable } from 'rxjs';
import { filter, first, map, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HomePageResolver implements Resolve<boolean> {
  constructor(
    private productQuery: ProductsService,
    private reviewQuery: ReviewService,
    private store: Store<ShopState>,
    private loading: LoadingService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.store.select(selectIsLoaded).pipe(
      tap((isLoaded) =>
        !isLoaded ? this.store.dispatch(loadHomePage()) : null
      ),
      tap(() => console.log('Route finished resolving...')),
      filter((loaded) => !!loaded),
      first()
    );
  }
}
