import { Subject } from 'rxjs';

import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NotificationService } from '@app/services/notification.service';

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
    error: 'bg-bgDanger',
  };
  messageMap = {
    success: 'Success',
    info: 'Information',
    error: 'Error',
  };
  iconMap = {
    success: 'check_circle',
    info: 'info',
    error: 'error',
  };
  destroy: Subject<null> = new Subject();
  constructor(public notify: NotificationService) {}

  ngOnInit(): void {
    this.notify.emitter$.subscribe((value) => console.log(value));
  }

  ngOnDestroy() {
    this.destroy.next(null);
  }
  close(key: string) {}
}
