import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  searchForm = this.fb.group({
    search: [''],
  });
  get searchInput() {
    return this.searchForm.get('search');
  }
  constructor(public fb: FormBuilder) {}
}
