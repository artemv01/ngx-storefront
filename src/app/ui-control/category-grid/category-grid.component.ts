import { Component, OnInit, Input } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Category } from '@app/type/category';
@Component({
  selector: 'app-category-grid',
  templateUrl: './category-grid.component.html',
  styleUrls: ['./category-grid.component.scss'],
})
export class CategoryGridComponent implements OnInit {
  uploadsUrl = environment.uploadsUrl;
  @Input('categories') categories: Category[];
  constructor() {}

  ngOnInit(): void {}
}
