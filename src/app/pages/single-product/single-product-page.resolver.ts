import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { ShopState } from '@app/store';
import { loadSingleProductPage } from '@app/store/actions/actions';
import {
  selectIsLoaded,
  selectSingleProductPageData,
} from '@app/store/selectors';
import { Store } from '@ngrx/store';
import { forkJoin, Observable } from 'rxjs';
import { filter, first, map, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SingleProductPageResolver implements Resolve<boolean> {
  constructor(private store: Store<ShopState>) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.store.select(selectSingleProductPageData).pipe(
      tap((pageData) => {
        if (
          !pageData.product ||
          pageData.product._id !== route.paramMap.get('id')
        ) {
          this.store.dispatch(
            loadSingleProductPage({ itemId: route.paramMap.get('id') })
          );
        }
      }),
      map(
        (pageData) =>
          pageData.product && pageData.product._id == route.paramMap.get('id')
      ),
      filter((loaded) => !!loaded),
      first()
    );
  }
}
