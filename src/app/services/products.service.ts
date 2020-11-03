import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '@app/models/product';
import { Observable } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';

import { environment as env } from '@root/environments/environment';
import { QueryParams } from '@app/models/query-params';
import { QueryResponse } from '@app/models/query-response';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient, private router: Router) {}

  getOne(id: string | Product): Observable<Product> {
    return this.http
      .get<Product>(env.apiUrl + `product/${id}`)
      .pipe(delay(2000));
  }

  getMany(query: QueryParams): Observable<QueryResponse<Product>> {
    const params = new URLSearchParams();
    for (const [key, val] of Object.entries(query)) {
      params.set(key, val as string);
    }

    return this.http
      .get<any>(env.apiUrl + `product/?${params.toString()}`)
      .pipe(delay(2000));
  }

  onSale(): Observable<Product[]> {
    return this.http
      .get<Product[]>(env.apiUrl + `product/sale`)
      .pipe(delay(2000));
  }

  topRated(): Observable<any> {
    return this.http
      .get<Product[]>(env.apiUrl + `product/top-rated`)
      .pipe(delay(2000));
  }

  related(id: string): Observable<any> {
    return this.http
      .get<Product[]>(env.apiUrl + `product/${id}/related`)
      .pipe(delay(2000));
  }
}
