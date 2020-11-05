import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Product } from '@app/models/product';

import { Store } from '@ngrx/store';
import { forkJoin, Observable } from 'rxjs';
import { filter, first, map, switchMap, tap } from 'rxjs/operators';
import { loadSingleProductPage } from './store/single-product.actions';
import { SingleProductState } from './store/single-product.reducer';
import { selectProduct } from './store/single-product.selectors';

@Injectable({
  providedIn: 'root',
})
export class SingleProductPageResolver implements Resolve<boolean> {
  constructor(private store: Store<SingleProductState>) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.store.select(selectProduct).pipe(
      tap((product: Product) => {
        if (!product || product._id !== route.paramMap.get('id')) {
          this.store.dispatch(
            loadSingleProductPage({ itemId: route.paramMap.get('id') })
          );
        }
      }),
      map(
        (product: Product) => product && product._id == route.paramMap.get('id')
      ),
      filter((loaded) => !!loaded),
      first()
    );
  }
}
