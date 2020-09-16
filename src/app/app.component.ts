import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ngx-storefront';
  ngOnInit() {
    const splashScreen: HTMLElement = document.getElementById(
      'appLoadAnimation'
    );
    if (splashScreen) {
      splashScreen.remove();
    }
  }
}
