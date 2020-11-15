import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '@app/models/category';
import { Product } from '@app/models/product';
import { QueryItemsReq } from '@app/models/query-items-req';
import { QueryItemsResp } from '@app/models/query-items-resp';
import { CategoryService } from '@app/services/category.service';
import { NotificationService } from '@app/services/notification.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, catchError, concatMap, tap, switchMap } from 'rxjs/operators';
import { GlobalState } from '.';
import { ProductsService } from '../services/products.service';
import * as GlobalActions from './actions';

@Injectable()
export class GlobalEffects {
  constructor(
    private actions$: Actions,
    private productQuery: ProductsService,
    private categoryQuery: CategoryService,
    public notify: NotificationService,
    private store: Store<GlobalState>
  ) {}

  loadCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GlobalActions.loadCategories),
      tap(() => this.store.dispatch(GlobalActions.loadingOn())),
      concatMap(() => this.categoryQuery.getMany()),
      map((payload: Category[]) =>
        GlobalActions.loadCategoriesSuccess({ payload })
      ),
      tap(() => this.store.dispatch(GlobalActions.loadingOff())),

      catchError((error: HttpErrorResponse) =>
        of(GlobalActions.setError({ error }))
      )
    )
  );

  loadSearch$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GlobalActions.loadSearch),
      switchMap((query: any) =>
        this.productQuery.getMany(query.payload as QueryItemsReq)
      ),

      map((payload: QueryItemsResp<Product>) => {
        const updateStore = {
          products: payload.items,
          pagesTotal: payload.pages,
          showPagination: payload.pages > 1 ? true : false,
          currentPage: payload.page,
          itemsTotal: payload.total,
        };
        return GlobalActions.loadSearchSuccess({ payload: updateStore });
      }),
      catchError((error: HttpErrorResponse) =>
        of(GlobalActions.setError({ error }))
      )
    );
  });
}
