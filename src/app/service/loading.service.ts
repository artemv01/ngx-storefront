import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  display$ = new BehaviorSubject(false);
  displayIncrement = 0;
  permanent = false;
  constructor() {}
  show() {
    if (this.displayIncrement < 1) {
      setTimeout(() => this.display$.next(true), 0);
    }
    this.displayIncrement++;
  }
  showPermanent(show = true) {
    this.permanent = show;
    if (this.permanent) {
      setTimeout(() => this.display$.next(true), 0);
    } else {
      setTimeout(() => this.display$.next(false), 0);
    }
  }
  hide() {
    this.displayIncrement =
      this.displayIncrement > 1 ? this.displayIncrement - 1 : 0;
    if (this.displayIncrement === 0 && !this.permanent) {
      setTimeout(() => this.display$.next(false), 0);
    }
  }
  forceHide() {
    this.displayIncrement = 0;
    setTimeout(() => this.display$.next(false), 0);
  }
}
