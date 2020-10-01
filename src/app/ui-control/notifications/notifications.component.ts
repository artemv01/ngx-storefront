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

  ngOnInit(): void {}

  ngOnDestroy() {
    this.destroy.next(null);
  }
  close(key: string) {}
}
