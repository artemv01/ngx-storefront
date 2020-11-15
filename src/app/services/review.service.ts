import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Review } from '@app/models/review';
import { environment as env } from '@root/environments/environment';
import { CreateReviewResp } from '@app/models/create-review-resp';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  constructor(private http: HttpClient, private router: Router) {}

  recent(): Observable<Review[]> {
    return this.http.get<Review[]>(env.apiUrl + `review/recent`);
  }

  submit(data: Review): Observable<CreateReviewResp> {
    return this.http.post<CreateReviewResp>(env.apiUrl + `review/`, data);
  }

  forProduct(productId: string): Observable<CreateReviewResp> {
    return this.http.get<CreateReviewResp>(
      env.apiUrl + `product/${productId}/reviews`
    );
  }
}
