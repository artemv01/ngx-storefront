import {
  Component,
  OnInit,
  Input,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Attribute,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import places, { ReconfigurableOptions, StaticOptions } from 'places.js';
import { environment } from '@root/environments/environment';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit, AfterViewInit {
  @Input('addClass') addClass = '';
  @Input('control') control: FormControl;
  @Input('validate') validate: Record<any, string> = {};
  @ViewChild('inputEl') inputEl: ElementRef;
  @Input('placesConfig') placesConfig: ReconfigurableOptions;
  @Input('noSpin') noSpin = undefined;

  isValidate: boolean;
  pattern: string = '';
  isRequired = false;
  additClass = {
    'form-input': true,
  };
  constructor(
    @Attribute('required') public required,
    @Attribute('_id') public id,
    @Attribute('label') public label = '',
    @Attribute('placeholder') public placeholder = '',
    @Attribute('type') public type = 'text',
    @Attribute('name') public name
  ) {}

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
      places({
        appId: environment.algoliaPlacesAppId,
        apiKey: environment.algoliaPlacesApiKey,
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
