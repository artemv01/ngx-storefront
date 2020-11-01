import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Review } from '@app/type/review';
import { environment as env } from '@root/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  constructor(private http: HttpClient, private router: Router) {}

  recent(): Observable<Review[]> {
    return this.http.get<Review[]>(env.apiUrl + `review/recent`);
  }

  submit(data: Review): any {
    return this.http.post<any>(env.apiUrl + `review/`, data);
  }

  forProduct(productId: string): Observable<Review[]> {
    return this.http.get<Review[]>(env.apiUrl + `product/${productId}/reviews`);
  }
}
