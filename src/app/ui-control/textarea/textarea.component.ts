import { Component, OnInit, Input, Attribute } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
})
export class TextareaComponent implements OnInit {
  @Input('addClass') addClass = '';
  @Input('control') control: FormControl;
  @Input('validate') validate: Record<any, string> = {};

  isValidate: boolean;
  constructor(
    @Attribute('required') public required,
    @Attribute('_id') public id,
    @Attribute('label') public label = '',
    @Attribute('placeholder') public placeholder = '',
    @Attribute('type') public type = 'text',
    @Attribute('rows') public rows = 8,
    @Attribute('cols') public cols = 45,
    @Attribute('name') public name
  ) {}

  ngOnInit(): void {
    this.control = this.control ?? new FormControl('');
    this.isValidate = !!Object.keys(this.validate).length;
  }
}
