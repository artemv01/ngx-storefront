import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '@root/environments/environment';
import { map, catchError, tap } from 'rxjs/operators';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  mapsLoaded: Observable<boolean>;
  environment = environment;
  constructor(httpClient: HttpClient) {
    this.mapsLoaded = httpClient
      .jsonp(
        `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapsKey}`,
        'callback'
      )
      .pipe(
        tap(() => {
          (this.mapMarker.options as any).animation =
            google.maps.Animation.BOUNCE;
        }),
        map(() => true),
        catchError(() => of(false))
      );
  }

  mapOptions = {
    zoom: 15,
    center: {
      lat: 37.4220656,
      lng: -122.0840897,
    },
    options: {
      mapTypeId: 'hybrid',
      zoomControl: false,
      scrollwheel: false,
      disableDoubleClickZoom: true,
      maxZoom: 15,
      minZoom: 8,
    },
  };
  mapMarker = {
    position: {
      lat: 37.4220656,
      lng: -122.0840897,
    },
    label: {
      color: 'red',
      text: 'Storefront',
    },
    title: 'Storefront',
    options: {},
  };

  ngOnInit(): void {}
}
