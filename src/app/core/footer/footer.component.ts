import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  constructor() {}

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
    options: { animation: google.maps.Animation.BOUNCE },
  };

  ngOnInit(): void {}
}
