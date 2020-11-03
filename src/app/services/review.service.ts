import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Review } from '@app/models/review';
import { environment as env } from '@root/environments/environment';
import { ReviewsForProductResp } from '@app/models/reviews-for-product-resp';
import { CreateReviewResp } from '@app/models/create-review-resp';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  constructor(private http: HttpClient, private router: Router) {}

  recent(): Observable<Review[]> {
    return this.http
      .get<Review[]>(env.apiUrl + `review/recent`)
      .pipe(delay(2000));
  }

  submit(data: Review): Observable<CreateReviewResp> {
    return this.http
      .post<CreateReviewResp>(env.apiUrl + `review/`, data)
      .pipe(delay(2000));
  }

  forProduct(productId: string): Observable<ReviewsForProductResp> {
    return this.http
      .get<ReviewsForProductResp>(env.apiUrl + `product/${productId}/reviews`)
      .pipe(delay(2000));
  }
}
