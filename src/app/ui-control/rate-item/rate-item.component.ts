import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  forwardRef,
  OnChanges,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { isNull } from '@angular/compiler/src/output/output_ast';

const RATE_ITEM_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => RateItemComponent),
  multi: true,
};

@Component({
  selector: 'app-rate-item',
  templateUrl: './rate-item.component.html',
  styleUrls: ['./rate-item.component.scss'],
  providers: RATE_ITEM_VALUE_ACCESSOR,
})
export class RateItemComponent implements OnInit, ControlValueAccessor {
  starWidth = 24;
  ratingState = Array(5).fill('star_outline');

  private rating: number = 0;
  private disabled: boolean;
  private onChange: Function;
  private onTouched: Function;

  constructor() {
    this.onChange = (_: any) => {};
    this.onTouched = () => {};
    this.disabled = false;
  }
  isTouchScreen() {
    return 'ontouchstart' in document.documentElement;
  }

  ngOnInit(): void {
    this.buildStars();
  }

  hoverRate(starIndex: number, lastStar: string) {
    this.ratingState = this.ratingState.map((_, index) => {
      if (index < starIndex) {
        return 'star';
      } else if (index > starIndex) {
        return 'star_outline';
      } else {
        return lastStar;
      }
    });
  }

  rate(newRating: number = this.rating) {
    this.rating = newRating;
    this.buildStars();
    this.onChange(this.rating);
    this.onTouched();
  }

  writeValue(rating: number): void {
    if (rating === null) {
      rating = 0;
    }
    this.rating = rating;

    this.buildStars();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  buildStars() {
    if (this.rating < 1) {
      if (this.rating === 0.5) {
        this.ratingState[0] = 'star_half';
        this.ratingState.fill('star_outline', 1);
        return;
      } else if (this.rating === 0) {
        this.ratingState.fill('star_outline', 0);
      } else {
        return;
      }
    }
    let newRating = this.rating - 1;
    let truncated = Math.trunc(newRating);
    let lastIndex = 0;

    this.ratingState = this.ratingState.map((_, index) => {
      if (index <= truncated) {
        lastIndex = index;
        return 'star';
      } else if (index > truncated) {
        return 'star_outline';
      }
    });
    if (lastIndex < 4) {
      lastIndex++;
      if (newRating - truncated >= 0.5) {
        this.ratingState[lastIndex] = 'star_half';
      }
    }
  }
}
