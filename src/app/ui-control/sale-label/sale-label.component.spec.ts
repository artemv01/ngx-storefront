import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleLabelComponent } from './sale-label.component';

describe('SaleLabelComponent', () => {
  let component: SaleLabelComponent;
  let fixture: ComponentFixture<SaleLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaleLabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
