import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { click } from '@app/test-util/helpers';
import { TestUtilModule } from '@app/test-util/test-util.module';
import { IconComponent } from '../icon/icon.component';
import { ButtonComponent } from './button.component';

@Component({
  template: `<app-button
    [disabled]="disabled"
    (click)="increment()"
    [addClass]="additClass"
    [type]="type"
  ></app-button>`,
})
class TestHostComponent {
  disabled: boolean;
  clickCount = 0;
  additClass: string;
  type: string;
  increment() {
    this.clickCount++;
  }
}

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;
  let hostF: ComponentFixture<TestHostComponent>;
  let hostC: TestHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonComponent, TestHostComponent, IconComponent],
      imports: [NoopAnimationsModule, TestUtilModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    hostF = TestBed.createComponent(TestHostComponent);
    hostC = hostF.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the disabled attribute', () => {
    hostC.disabled = true;
    hostF.detectChanges();

    const button = hostF.debugElement.query(By.css('button'));
    expect(button.nativeElement.hasAttribute('disabled')).toBeTrue();
  });
  it('should set type attribute', () => {
    const type = 'button';
    hostC.type = type;
    hostF.detectChanges();
    const button = hostF.debugElement.query(By.css('button'));
    expect(button.nativeElement.getAttribute('type')).toBe(type);
  });
  it('should handle the click event', () => {
    hostF.detectChanges();
    const button = hostF.debugElement.query(By.css('app-button'));
    expect(button).toBeTruthy();
    click(button);
    expect(hostC.clickCount).toBe(1);
  });
  it('adds additional classes', () => {
    const additClass = 'btn-primary';

    hostC.additClass = additClass;
    hostF.detectChanges();

    const button = hostF.debugElement.query(By.css('button'));
    expect(button.nativeElement.className.split(/\s+/)).toContain(additClass);
  });
});
