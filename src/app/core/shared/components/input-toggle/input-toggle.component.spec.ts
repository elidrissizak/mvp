import { DebugElement } from '@angular/core';
import { CoreModule } from './../../../core.module';
import { CoreComponent } from './../../../core.component';
import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { InputToggleComponent } from './input-toggle.component';
import { By } from "@angular/platform-browser";

describe('InputToggleComponent', () => {
    let component: InputToggleComponent;
    let fixture: ComponentFixture<InputToggleComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [CoreModule]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(InputToggleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should change state on click', () => {
        spyOn(component, 'changeState').and.callThrough();
        let checkbox: DebugElement = fixture.debugElement.queryAll(By.css('input'))[0];
        expect(checkbox).toBeDefined();
        checkbox.triggerEventHandler('change', { target: checkbox.nativeElement });
        expect(component.changeState).toHaveBeenCalled();
    });
});
