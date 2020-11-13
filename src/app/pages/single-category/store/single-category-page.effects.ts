import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, map, switchMap, tap } from 'rxjs/operators';

import * as SingleCategoryPageActions from './single-category-page.actions';
import { ProductsService } from '@app/services/products.service';
import { QueryItemsResp } from '@app/models/query-items-resp';
import { Product } from '@app/models/product';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { QueryItemsReq } from '@app/models/query-items-req';
import { SingleCategoryPageState } from './single-category-page.reducer';
import { ShopState } from '@app/store';
import { Store } from '@ngrx/store';
import { loadingOff, loadingOn } from '@app/store/actions';

@Injectable()
export class SingleCategoryPageEffects {
  loadPageData$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SingleCategoryPageActions.loadPageData),
      tap(({ pageLoading }) =>
        pageLoading ? setTimeout(() => this.store.dispatch(loadingOn())) : null
      ),
      switchMap((query: any) =>
        this.productQuery.getMany(query.payload as QueryItemsReq)
      ),

      map((payload: QueryItemsResp<Product>) => {
        const updateStore: SingleCategoryPageState = {
          products: payload.items,
          pagesTotal: payload.pages,
          currentPage: payload.page,
          itemsTotal: payload.total,
          categoryName: payload.categoryName,
        };
        updateStore.showPagination = updateStore.pagesTotal > 1 ? true : false;
        return SingleCategoryPageActions.loadPageDataSuccess({
          payload: updateStore,
        });
      }),
      tap(() => setTimeout(() => this.store.dispatch(loadingOff()))),

      catchError((error: HttpErrorResponse) => {
        return of(SingleCategoryPageActions.loadPageDataFailure({ error }));
      })
    );
  });

  constructor(
    private actions$: Actions,
    private productQuery: ProductsService,
    private store: Store<ShopState>
  ) {}
}
