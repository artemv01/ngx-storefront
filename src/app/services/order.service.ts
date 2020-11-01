import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Category } from '@app/models/category';
import { Order } from '@app/models/order';
import { Product } from '@app/models/product';
import { environment as env } from '@root/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient, private router: Router) {}

  create(order: Order) {
    return this.http.post<string>(env.apiUrl + `order`, order);
  }
}
