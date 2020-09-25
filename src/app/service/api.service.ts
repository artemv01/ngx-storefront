import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { environment as env } from '../../environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { Category } from '../type/category';
import { Product } from '../type/product';
import { Review } from '@app/type/review';
import { AlertService } from './alert.service';
import { LoadingService } from './loading.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private http: HttpClient,
    private alertService: AlertService,
    public loading: LoadingService,
    private router: Router
  ) {}

  getProductsOnSale(): Observable<any> {
    return this.http
      .get<Product[]>(env.apiUrl + `product/sale`)
      .pipe(catchError((err) => this.handleError(err)));
  }
  getTopRatedProducts(): Observable<any> {
    return this.http
      .get<Product[]>(env.apiUrl + `product/top-rated`)
      .pipe(catchError((err) => this.handleError(err)));
  }
  getProduct(id: string): Observable<any> {
    return this.http
      .get<Product[]>(env.apiUrl + `product/${id}`)
      .pipe(catchError((err) => this.handleError(err)));
  }
  getRelatedProducts(id: string): Observable<any> {
    return this.http
      .get<Product[]>(env.apiUrl + `product/${id}/related`)
      .pipe(catchError((err) => this.handleError(err)));
  }
  getProductsFiltered(data: any): Observable<any> {
    const params = new URLSearchParams();
    for (const [key, val] of Object.entries(data)) {
      params.set(key, val as string);
    }
    return this.http
      .get<any>(env.apiUrl + `product/?${params}`)
      .pipe(catchError((err) => this.handleError(err)));
  }

  getRecentReviews(): Observable<any> {
    return this.http
      .get<Review[]>(env.apiUrl + `review/recent`)
      .pipe(catchError((err) => this.handleError(err)));
  }

  getCategories(): Observable<Category[]> {
    return this.http
      .get<Category[]>(env.apiUrl + `category/`)
      .pipe(catchError((err) => this.handleError(err)));
  }
  getCategoriesBulk(): Observable<Category[]> {
    return this.http
      .get<Category[]>(env.apiUrl + `category/bulk`)
      .pipe(catchError((err) => this.handleError(err)));
  }

  submitReview(data: Review): any {
    return this.http
      .post<any>(env.apiUrl + `review/`, data)
      .pipe(catchError((err) => this.handleError(err)));
  }
  getReviewsForProduct(productId: string): Observable<Review[]> {
    return this.http
      .get<Review[]>(env.apiUrl + `product/${productId}/reviews`)
      .pipe(catchError((err) => this.handleError(err)));
  }

  submitOrder(order: any) {
    return this.http
      .post<any>(env.apiUrl + `orders`, order)
      .pipe(catchError((err) => this.handleError(err)));
  }

  handleError(err: HttpErrorResponse, errMsg?: Record<number, any>) {
    this.router.navigate(['/error']);
    return throwError(err);
    /* let errorMessage = 'Oops! Sorry, something went wrong.';
    if (!err.status) {
      this.alertService.show(errorMessage);
      return throwError(errorMessage);
    }

    if (errMsg && err.status in errMsg) {
      this.alertService.show(errMsg[err.status]);

      return throwError(errMsg[err.status]);
    }

    this.alertService.show(errorMessage);
    return throwError(err); */
  }
}
