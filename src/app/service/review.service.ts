import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Review } from '@app/type/review';
import { environment as env } from '@root/environments/environment';
import { ReviewsForProductResp } from '@app/type/reviews-for-product-resp';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  constructor(private http: HttpClient, private router: Router) {}

  recent(): Observable<Review[]> {
    return this.http.get<Review[]>(env.apiUrl + `review/recent`);
  }

  submit(data: Review): Observable<void> {
    return this.http.post<void>(env.apiUrl + `review/`, data);
  }

  forProduct(productId: string): Observable<ReviewsForProductResp> {
    return this.http.get<ReviewsForProductResp>(
      env.apiUrl + `product/${productId}/reviews`
    );
  }
}
