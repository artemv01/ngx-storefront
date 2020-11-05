import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { HomePageState } from './home-page.reducer';

export const loadHomePage = createAction(
  '[Home Component] Load Home Page Data'
);
export const loadHomePageSuccess = createAction(
  '[Home Component] Load Home Page Data Success',
  props<{ payload: HomePageState }>()
);
export const loadHomePageFailure = createAction(
  '[Home Component] Load Home Page Data Failure',
  props<{ error: HttpErrorResponse }>()
);
