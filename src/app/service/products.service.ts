import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '@app/type/product';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment as env } from '@root/environments/environment';
import { QueryParams } from '@app/type/query-params';
import { QueryResponse } from '@app/type/query-response';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient, private router: Router) {}

  getOne(id: string | Product): Observable<Product> {
    return this.http.get<Product>(env.apiUrl + `product/${id}`);
  }

  getMany(query: QueryParams): Observable<QueryResponse<Product>> {
    const params = new URLSearchParams();
    for (const [key, val] of Object.entries(query)) {
      params.set(key, val as string);
    }

    return this.http.get<any>(env.apiUrl + `product/?${params.toString()}`);
  }

  onSale(): Observable<Product[]> {
    return this.http.get<Product[]>(env.apiUrl + `product/sale`);
  }

  topRated(): Observable<any> {
    return this.http.get<Product[]>(env.apiUrl + `product/top-rated`);
  }

  related(id: string): Observable<any> {
    return this.http.get<Product[]>(env.apiUrl + `product/${id}/related`);
  }
}
