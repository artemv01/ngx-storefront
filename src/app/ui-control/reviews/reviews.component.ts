import { Component, OnInit, Input } from '@angular/core';
import { Review } from '@app/models/review';
@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss'],
})
export class ReviewsComponent implements OnInit {
  @Input('reviews') reviews: Review[];
  constructor() {}

  ngOnInit(): void {}
}
