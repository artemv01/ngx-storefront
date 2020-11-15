import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Category } from '@app/models/category';
import { environment as env } from '@root/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient, private router: Router) {}

  getMany(): Observable<Category[]> {
    return this.http.get<Category[]>(env.apiUrl + `category/bulk`);
  }
}
