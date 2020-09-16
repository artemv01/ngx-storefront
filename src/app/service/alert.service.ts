import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  display = new BehaviorSubject<boolean>(false);
  message = 'Oops! Sorry, something went wrong';
  header = 'Internal error';
  show(
    message = 'Oops! Sorry, something went wrong',
    header = 'Internal error'
  ) {
    this.message = message;
    this.header = header;
    this.display.next(true);
  }

  hide() {
    this.display.next(false);
  }
}
