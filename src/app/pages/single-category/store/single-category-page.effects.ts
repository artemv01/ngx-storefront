import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, map, switchMap, tap } from 'rxjs/operators';

import * as SingleCategoryPageActions from './single-category-page.actions';
import { ProductsService } from '@app/services/products.service';
import { QueryItemsResp } from '@app/models/query-items-resp';
import { Product } from '@app/models/product';
import { HttpErrorResponse } from '@angular/common/http';
import { ShopActions } from '@app/store/actions';
import { of } from 'rxjs';
import { QueryItemsReq } from '@app/models/query-items-req';
import { SingleCategoryPageState } from './single-category-page.reducer';

@Injectable()
export class SingleCategoryPageEffects {
  loadPageData$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SingleCategoryPageActions.loadPageData),
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
      catchError((error: HttpErrorResponse) => {
        return of(ShopActions.loadCategoriesFailure({ error }));
      })
    );
  });

  constructor(
    private actions$: Actions,
    private productQuery: ProductsService
  ) {}
}
