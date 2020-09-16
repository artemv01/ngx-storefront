import {
  Component,
  OnInit,
  ViewChild,
  Input,
  AfterViewInit,
  forwardRef,
  Renderer2,
  ElementRef,
  EventEmitter,
  Output,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

const RATE_ITEM_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SelectInputComponent),
  multi: true,
};

@Component({
  selector: 'app-select-input',
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.scss'],
  host: {
    '(document:click)': 'closeAll($event)',
  },
  providers: RATE_ITEM_VALUE_ACCESSOR,
})
export class SelectInputComponent implements OnInit, AfterViewInit {
  @ViewChild('inputBulkActions') inputBulkActions;
  @ViewChild('inputBulkActionsWrapper') inputBulkActionsWrapper;
  @ViewChild('arrowUp') arrowUp;
  @ViewChild('arrowDown') arrowDown;
  @ViewChild('titleBtn') titleBtn;
  @Input() width: string = '18rem';
  @Input() options: string[];
  @Input() addClass: string;
  @Input() addClassWrapper: string;
  @Input() title: string;
  @Input() autoWidth: boolean;
  @Output() change = new EventEmitter();

  selectedOption: string;

  isActive: boolean;

  private disabled: boolean;
  private onChange: Function;
  private onTouched: Function;

  constructor(private renderer: Renderer2, private host: ElementRef) {
    this.onChange = (_: any) => {};
    this.onTouched = () => {};
    this.disabled = false;
  }
  writeValue(selected: string): void {
    this.selectedOption = selected;
  }
  get isDisabled() {
    return this.host.nativeElement?.attributes?.disabled?.value === 'true';
  }

  doChange(selected = '') {
    this.selectedOption = selected;
    this.onChange(selected);
    this.change.emit(selected);
    this.onTouched();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    if (this.autoWidth) {
      this.inputBulkActionsWrapper.nativeElement.style.width = `${this.inputBulkActionsWrapper.nativeElement.firstChild.offsetWidth}px`;
      this.inputBulkActionsWrapper.nativeElement.style.maxWidth = `${this.inputBulkActionsWrapper.nativeElement.firstChild.offsetWidth}px`;
    }
  }

  expandBulkActions() {
    if (this.isDisabled) {
      return;
    }
    if (this.isActive) {
      if (!this.autoWidth) {
        this.inputBulkActions.nativeElement.style.overflowY = 'hidden';
      }
      this.inputBulkActions.nativeElement.style.height = `0`;
      this.isActive = false;

      return;
    }
    let itemsNumber = this.options.length;

    this.inputBulkActions.nativeElement.style.height = `${
      2.5 * itemsNumber
    }rem`;
    this.isActive = true;

    // this is so we don't see the scrollbar during animation
    if (!this.autoWidth) {
      setTimeout(() => {
        this.inputBulkActions.nativeElement.style.overflowY = 'auto';
      }, 200);
    }
  }

  closeAll(event) {
    if (
      !this.titleBtn.nativeElement.contains(event.target) &&
      !this.arrowDown?.nativeElement.isSameNode(event.target) &&
      !this.arrowUp?.nativeElement.isSameNode(event.target)
    ) {
      if (this.isActive) {
        this.inputBulkActions.nativeElement.style.height = `0`;
        this.isActive = false;
        return;
      }
    }
  }
}
