import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss'],
})
export class StarRatingComponent implements OnChanges {
  @Input('rating') rating: number;

  stars: string[] = [];
  @Input('addClass') addClass: string = '';
  constructor() {}

  ngOnChanges() {
    this.update();
  }

  update() {
    this.stars = [];
    this.rating = Number(this.rating);
    if (isNaN(this.rating) || this.rating <= 0) {
      return;
    }
    let i = 1;
    for (; i < 6; i++) {
      if (Math.trunc(this.rating / i)) {
        this.stars.push('star');
      } else {
        break;
      }
    }

    if (this.stars.length !== 5 && !Math.trunc(this.rating - i / 1)) {
      const div = 1 - Math.abs(this.rating - i);
      if (div >= 0.5) {
        this.stars.push('star_half');
      }
    }

    for (i = this.stars.length + 1; i < 6; i++) {
      this.stars.push('star_outline');
    }
  }
}
