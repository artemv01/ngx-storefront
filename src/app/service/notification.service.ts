import { Injectable } from '@angular/core';
import { Notification } from '@app/type/notification';
import { Subject, BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  emitter$: Subject<Notification[]> = new Subject();
  dismiss: Subject<null> = new Subject();
  notifications: Record<string, Notification> = {};
  constructor() {}
  push(data: Notification = {}) {
    if (!data.type) {
      data.type = 'success';
    }
    if (!data.message) {
      data.message = '';
    }
    const key = new Date().getTime();
    this.notifications[key] = { ...data, key: key };
    this.emitter$.next(Object.values(this.notifications));
    setInterval(() => {
      delete this.notifications[key];
      this.emitter$.next(Object.values(this.notifications));
    }, 112500);
  }

  close(key: number) {
    delete this.notifications[key];
    this.emitter$.next(Object.values(this.notifications));
  }

  dismissAll() {
    this.notifications = {};
    this.emitter$.next([]);
  }
}
