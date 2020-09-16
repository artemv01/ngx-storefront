import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.scss'],
})
export class PriceComponent implements OnInit {
  @Input('price') price: number;
  @Input('addClass') addClass: string;
  constructor() {}

  ngOnInit(): void {}
}
