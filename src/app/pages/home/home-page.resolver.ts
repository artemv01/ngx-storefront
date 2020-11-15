import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, first, tap } from 'rxjs/operators';
import { loadHomePage } from './store/home-page.actions';
import { HomePageState } from './store/home-page.reducer';
import { selectHomePageLoaded } from './store/home-page.selectors';

@Injectable({
  providedIn: 'root',
})
export class HomePageResolver implements Resolve<boolean> {
  constructor(private store: Store<HomePageState>) {}

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
