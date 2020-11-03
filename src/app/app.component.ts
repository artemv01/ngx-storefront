import { Component } from '@angular/core';
import { fadeAnimation } from './core/animations';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeAnimation],
})
export class AppComponent {
  title = 'ngx-storefront';
  constructor(public loading: LoadingService) {}
  ngOnInit() {
    const splashScreen: HTMLElement = document.getElementById(
      'appLoadAnimation'
    );
    if (splashScreen) {
      splashScreen.remove();
    }
  }
}
