import { Component, OnInit, Input } from '@angular/core';
import { Breadcrumbs } from '@app/models/breadcrumbs';
@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
})
export class BreadcrumbsComponent implements OnInit {
  @Input('navs') navs: Breadcrumbs[] = [];

  start = ['Home', ['/']];
  constructor() {}

  ngOnInit(): void {}
}
