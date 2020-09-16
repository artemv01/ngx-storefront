import {
  Component,
  OnInit,
  Input,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import places, { ReconfigurableOptions, StaticOptions } from 'places.js';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit, AfterViewInit {
  @Input('type') type = 'text';
  @Input('addClass') addClass = '';
  @Input('label') label = '';
  @Input('placeholder') placeholder = '';
  @Input('control') control: FormControl;
  @Input('required') required: boolean;
  @Input('validate') validate: Record<any, string> = {};
  @ViewChild('inputEl') inputEl: ElementRef;
  @Input('placesConfig') placesConfig: ReconfigurableOptions;
  @Input('noSpin') noSpin = undefined;
  @Input('el-id') elId = '';

  isValidate: boolean;
  pattern: string = '';
  additClass = {
    'form-input': true,
  };
  constructor() {}

  ngOnInit(): void {
    this.control = this.control ?? new FormControl('');
    this.isValidate = !!Object.keys(this.validate).length;
    if (this.type === 'tel') {
      this.pattern = 'd*';
    }
    if (this.addClass) {
      this.additClass[this.addClass] = true;
    }
    if (this.noSpin !== undefined) {
      this.additClass['no-spin'] = true;
    }
  }

  ngAfterViewInit() {
    if (this.placesConfig) {
      var placesAutocomplete = places({
        appId: 'pl7YQAV8478T',
        apiKey: '05cac0c539ea24366b2f55fc957c75c9',
        container: this.inputEl.nativeElement as HTMLInputElement,
        templates: {
          value: function (suggestion) {
            return suggestion.name;
          },
        },
      } as StaticOptions).configure(this.placesConfig);
    }
  }
}
