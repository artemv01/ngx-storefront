import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '@app/models/product';
import { Observable } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';

import { environment as env } from '@root/environments/environment';
import { QueryItemsReq } from '@app/models/query-items-req';
import { QueryItemsResp } from '@app/models/query-items-resp';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient, private router: Router) {}

  getOne(id: string | Product): Observable<Product> {
    return this.http.get<Product>(env.apiUrl + `product/${id}`);
  }

  getMany(query: QueryItemsReq): Observable<QueryItemsResp<Product>> {
    const params = new URLSearchParams();
    for (const [key, val] of Object.entries(query)) {
      params.set(key, val as string);
    }

    return this.http.get<any>(env.apiUrl + `product/?${params.toString()}`);
  }

  onSale(): Observable<Product[]> {
    return this.http.get<Product[]>(env.apiUrl + `product/sale`);
  }

  topRated(): Observable<Product[]> {
    return this.http.get<Product[]>(env.apiUrl + `product/top-rated`);
  }

  related(id: string): Observable<Product[]> {
    return this.http.get<Product[]>(env.apiUrl + `product/${id}/related`);
  }
}
