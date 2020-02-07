import { MonthYearPickerComponent } from './month-year-picker.component';
import { PeriodPickerComponent } from './period-picker.component';
import { SharedModule } from 'app/shared/shared.module';
import { TestBed, async, getTestBed } from '@angular/core/testing';
import { Injector } from "@angular/core/src/di";
import { ComponentFixture } from "@angular/core/testing";
import { DebugElement, Component } from "@angular/core";
import { By } from "@angular/platform-browser";

@Component({
  template: `<period-picker [period]="period"></period-picker>`
})
class TestHostComponent {
  period = { startDate: new Date(2017, 0, 1), endDate: new Date(2017, 0, 31) }
}

describe('PeriodPickerComponent', () => {

  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule
      ],
      declarations: [
        MonthYearPickerComponent,
        PeriodPickerComponent,
        TestHostComponent,
      ]
    });
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;

  });

  it('should exist', async(() => {
    expect(PeriodPickerComponent).toBeDefined();
    expect(component).toBeDefined();
  }));

  it('should not be visible at first', async(() => {
    let picker = fixture.debugElement.queryAll(By.css('.bim-calendar .bim-calendar-hover'))[0];
    expect(picker).toBeUndefined();
  }));


});

