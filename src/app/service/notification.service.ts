import { Injectable } from '@angular/core';
import { Notification } from '@app/type/notification';
import { Subject, BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  emitter: Subject<Notification> = new Subject();
  dismiss: Subject<null> = new Subject();
  constructor() {}
  push(data: Notification = {}) {
    this.emitter.next(data);
  }
  dismissAll() {
    this.dismiss.next(null);
  }
}
