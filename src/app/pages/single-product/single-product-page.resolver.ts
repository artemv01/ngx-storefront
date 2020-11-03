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
  selectIsSingleProductPageLoaded,
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
    return this.store.select(selectIsSingleProductPageLoaded).pipe(
      tap((isLoaded) =>
        !isLoaded
          ? this.store.dispatch(
              loadSingleProductPage({ itemId: route.paramMap.get('id') })
            )
          : null
      ),
      filter((loaded) => !!loaded),
      first()
    );
  }
}
