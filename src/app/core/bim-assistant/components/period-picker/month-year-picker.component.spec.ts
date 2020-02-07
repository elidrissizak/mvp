import { SharedModule } from './../../../../shared/shared.module';
import { MonthYearPickerComponent } from './month-year-picker.component';
import { TestBed, async, getTestBed, ComponentFixture } from '@angular/core/testing';
import { Injector } from "@angular/core/src/di";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

describe('MonthYearPickerComponent', () => {

    let component: MonthYearPickerComponent;
    let fixture: ComponentFixture<MonthYearPickerComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                SharedModule
            ],
            declarations: [MonthYearPickerComponent]
        });
        fixture = TestBed.createComponent(MonthYearPickerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

    });

    it('should exist', async(() => {
        expect(MonthYearPickerComponent).toBeDefined();
        expect(component).toBeDefined();
    }));

    it('should allow month selection', async(() => {
        spyOn(component, 'onMonthClick').and.callThrough();
        let monthEl = fixture.debugElement.queryAll(By.css('.month'))[0];
        monthEl.triggerEventHandler('click', null);
        fixture.detectChanges();
        expect(component.onMonthClick).toHaveBeenCalled();
        expect(component.selectedMonth).toEqual(0);
        expect(monthEl.classes.selected).toBe(true);
    }));

    it('should not show years at the beginning', async(() => {
        let years = fixture.debugElement.queryAll(By.css('.bim-year'));
        expect(years.length).toEqual(0);
    }));

    it('should allow year selection after month selection', async(() => {
        let monthEl = fixture.debugElement.queryAll(By.css('.month'))[0];
        monthEl.triggerEventHandler('click', null);
        fixture.detectChanges();
        spyOn(component, 'onYearClick').and.callThrough();
        let yearEl = fixture.debugElement.queryAll(By.css('.bim-year>time'))[0];
        yearEl.triggerEventHandler('click', null);
        fixture.detectChanges();
        expect(component.onYearClick).toHaveBeenCalled();
        expect(component.selectedYear).toEqual((new Date()).getFullYear() - 4);
    }));

    it('Should disable month selection after having selected one', async(() => {
        fixture.debugElement.queryAll(By.css('.month'))[0].triggerEventHandler('click', null);
        fixture.detectChanges();
        expect(fixture.debugElement.queryAll(By.css('.month')).filter(el => el.classes.disabled !== true).length).toEqual(0);
    }));
}); 
