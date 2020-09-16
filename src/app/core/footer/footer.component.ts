import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  constructor() {}

  mapOptions = {
    zoom: 12,
    center: {
      lat: 35.659907,
      lng: 137.775487,
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
      lat: 35.659907,
      lng: 137.775487,
    },
    label: {
      color: 'red',
      text: 'WebShop',
    },
    title: 'WebShop',
    options: { animation: google.maps.Animation.BOUNCE },
  };

  ngOnInit(): void {}
}
