import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { click } from '@app/test-util/helpers';
import { TestUtilModule } from '@app/test-util/test-util.module';
import { IconComponent } from '../icon/icon.component';
import { RateItemComponent } from './rate-item.component';

@Component({
  template: `<app-rate-item [(ngModel)]="rating"></app-rate-item>`,
})
class TestHostComponent {
  rating = 0;
}

describe('RateItemComponent', () => {
  let component: RateItemComponent;
  let fixture: ComponentFixture<RateItemComponent>;
  let hostF: ComponentFixture<TestHostComponent>;
  let hostC: TestHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RateItemComponent, TestHostComponent, IconComponent],
      imports: [NoopAnimationsModule, TestUtilModule, FormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RateItemComponent);
    component = fixture.componentInstance;
    hostF = TestBed.createComponent(TestHostComponent);
    hostC = hostF.componentInstance;
    hostF.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the rating correctly by click', () => {
    hostF.detectChanges();
    const stars = hostF.debugElement.queryAll(By.css('.star-elem'));

    let counter = 0;
    for (let { nativeElement: star } of stars) {
      click(star.querySelector('.half'));
      counter += 0.5;
      expect(expect(hostC.rating).toBe(counter));

      counter += 0.5;
      click(star.querySelector('.full'));
      expect(expect(hostC.rating).toBe(counter));
    }
  });

  /*  it('should display the rating correctly', () => {
    const stars = hostF.debugElement.queryAll(By.css('.star-elem'));
    expect(stars[0].nativeElement.querySelector('i').textContent).toBe('star');
    expect(stars[1].nativeElement.querySelector('i').textContent).toBe('star');
    expect(stars[2].nativeElement.querySelector('i').textContent).toBe('star');
    expect(stars[3].nativeElement.querySelector('i').textContent).toBe(
      'star_half'
    );
  }); */
});
