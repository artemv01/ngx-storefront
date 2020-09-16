import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
})
export class TextareaComponent implements OnInit {
  @Input('cols') cols = 45;
  @Input('rows') rows = 8;
  @Input('label') label = '';
  @Input('addClass') addClass = '';
  @Input('control') control: FormControl;
  @Input('validate') validate: Record<any, string> = {};
  @Input('placeholder') placeholder = '';
  @Input('required') required: boolean;
  @Input('el-id') elId = '';

  isValidate: boolean;
  constructor() {}

  ngOnInit(): void {
    this.control = this.control ?? new FormControl('');
    this.isValidate = !!Object.keys(this.validate).length;
  }
}
