import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  trigger,
  transition,
  style,
  animate,
  state,
} from '@angular/animations';
import { Notification } from '@app/type/notification';
import { NotificationService } from '@app/service/notification.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  animations: [
    trigger('slide', [
      transition(':enter', [
        style({ transform: 'translateX(110%)' }),
        animate('100ms ease-out', style({ transform: 'translateX(0%)' })),
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'translateX(110%)' })),
        style({ display: 'none' }),
      ]),
    ]),
  ],
})
export class NotificationsComponent implements OnInit, OnDestroy {
  notifications: Notification[] = [];

  typeMap = {
    success: 'bg-bgSuccess',
    info: 'bg-bgInfo',
    danger: 'bg-bgDanger',
  };
  messageMap = {
    success: 'Success',
    info: 'Information',
    danger: 'Error',
  };
  iconMap = {
    success: 'check_circle',
    info: 'info',
    danger: 'error',
  };

  destroy: Subject<null> = new Subject();
  constructor(public notify: NotificationService) {}

  ngOnInit(): void {
    this.notify.dismiss
      .pipe(takeUntil(this.destroy))
      .subscribe(() => (this.notifications = []));
    this.notify.emitter
      .pipe(takeUntil(this.destroy))
      .subscribe((data: Notification) => {
        if (!data.type) {
          data.type = 'success';
        }
        if (!data.message) {
          data.message = '';
        }
        console.log(data);
        let last = this.notifications.push({ ...data });
      });
  }
  close(index: number) {
    this.notifications.splice(index, 1);
  }
  ngOnDestroy() {
    this.destroy.next(null);
  }
}
