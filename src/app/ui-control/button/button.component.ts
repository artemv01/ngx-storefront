import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  constructor() {}

  @Input('type') type = 'button';
  @Input('addClass') addClass = '';
  @Input('disabled') disabled = false;
  //   @Output('click') onClick = new EventEmitter<any>();
  ngOnInit(): void {}
}
