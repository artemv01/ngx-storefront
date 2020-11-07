import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

export const fadeAnimation = trigger('fade', [
  state('in', style({ opacity: 1 })),

  transition(':enter', [style({ opacity: 0 }), animate(200)]),

  transition(':leave', animate(200, style({ opacity: 0 }))),
]);

export const fadeInAnimation = trigger('fadeIn', [
  transition(':enter', [
    style({ opacity: '0' }),
    animate('.5s ease-out', style({ opacity: '1' })),
  ]),
]);
