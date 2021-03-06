import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Review } from '@app/models/review';

@Component({
  selector: 'app-review-slider',
  templateUrl: './review-slider.component.html',
  styleUrls: ['./review-slider.component.scss'],
})
export class ReviewSliderComponent implements OnInit, AfterViewInit {
  @Input('reviews') reviews: Review[] = [];

  @ViewChild('slideNavPrev') slideNavPrev: ElementRef;
  @ViewChild('slideNavNext') slideNavNext: ElementRef;
  slideConfig = {};
  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    /*  this.slideConfig = {
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: this.slideNavNext.nativeElement,
      prevArrow: this.slideNavPrev.nativeElement,
      infinite: true,
      adaptiveHeight: true,
    }; */
    this.slideConfig = {
      navigation: {
        nextEl: '.next-slide',
        prevEl: '.prev-slide',
      },
    };
  }
}
