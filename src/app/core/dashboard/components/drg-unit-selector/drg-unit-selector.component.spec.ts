import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DrgUnitSelectorComponent } from './drg-unit-selector.component';
import { Observable } from 'rxjs/Rx';
import { OAuthModule } from 'angular-oauth2-oidc';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TestBed, async, getTestBed, ComponentFixture } from '@angular/core/testing';
import { Injector } from "@angular/core/src/di";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

describe('DrgUnitSelectorComponent', () => {

    let component: DrgUnitSelectorComponent;
    let fixture: ComponentFixture<DrgUnitSelectorComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                CommonModule,
                FormsModule,
                ReactiveFormsModule,
                ButtonsModule.forRoot(),
            ],
            declarations: [DrgUnitSelectorComponent],

        });
        fixture = TestBed.createComponent(DrgUnitSelectorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('Should be defined', async(() => {
        expect(component).toBeDefined();
    }));

    it('Should have 3 buttons', async(() => {
        let buttons: DebugElement[] = fixture.debugElement.queryAll(By.css('button'));
        expect(buttons.length).toEqual(3);
    }));

    it('Should call switchTo(unit) on buttons clicks', async(() => {
        spyOn(component, 'switchTo').and.callThrough();
        ['amount', 'count', 'percent'].forEach((unit, i) => {
            let buttons: DebugElement[] = fixture.debugElement.queryAll(By.css('button'));
            buttons[i].triggerEventHandler('click', { target: buttons[i].nativeElement });
            expect(component.switchTo).toHaveBeenCalledWith(unit);
            expect(component.unit).toEqual(unit);
        })
    }));
});
