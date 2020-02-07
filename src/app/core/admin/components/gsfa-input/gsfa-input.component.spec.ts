import { SharedModule } from './../../../../shared/shared.module';
import { CoreModule } from './../../../core.module';
import { GsfaInputComponent } from './gsfa-input.component';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs/Rx';
import { OAuthModule } from 'angular-oauth2-oidc';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ComponentFixture, TestBed, async, getTestBed, tick, fakeAsync } from '@angular/core/testing';
import { Injector } from "@angular/core/src/di";
import { DebugElement, Component } from "@angular/core";
import { By } from "@angular/platform-browser";
import { TypeaheadModule } from 'ngx-bootstrap';

@Component({
    selector: 'test-host',
    template: `<gsfa-input gsfas="[{frenchLabel: 'fr'}]"></gsfa-input> `
})
class TestHostComponent { }

describe('GsfaInputComponent', () => {

    let testHostComponent: TestHostComponent;
    let testHostFixture: ComponentFixture<TestHostComponent>;
    //let component: GsfaInputComponent;
    // let fixture: ComponentFixture<GsfaInputComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule,
                FormsModule,
                ReactiveFormsModule,
                SharedModule,
                TypeaheadModule.forRoot(),
            ],
            declarations: [GsfaInputComponent, TestHostComponent]
        }).compileComponents();

        testHostFixture = TestBed.createComponent(TestHostComponent);
        testHostComponent = testHostFixture.componentInstance;
        testHostFixture.detectChanges();

        // fixture = TestBed.createComponent(GsfaInputComponent);
        // component = fixture.componentInstance;
        // fixture.detectChanges();
    });

    // it('Should be defined', async(() => {
    //     expect(component).toBeDefined();
    // }));

    // it('should create', () => {
    //     expect(component).toBeTruthy();
    // });

    it('Should not be opened by default', async(() => {
        let input: DebugElement[] = testHostFixture.debugElement.queryAll(By.css('.open'));
        expect(input.length).toEqual(0);
    }));

    it('Should be opened on button click', async(() => {
        let button: DebugElement = testHostFixture.debugElement.queryAll(By.css('.add-button'))[0];
        button.triggerEventHandler('click', null);
        testHostFixture.detectChanges();
        let input: DebugElement[] = testHostFixture.debugElement.queryAll(By.css('.open'));
        expect(input.length).toEqual(4);
    }));

    it('Should be closed on cancel click', async(() => {
        let button: DebugElement = testHostFixture.debugElement.queryAll(By.css('.add-button'))[0];
        button.triggerEventHandler('click', null);
        testHostFixture.detectChanges();
        let input: DebugElement[] = testHostFixture.debugElement.queryAll(By.css('.open'));
        expect(input.length).toEqual(4);
        let cancel: DebugElement = testHostFixture.debugElement.queryAll(By.css('.cancel-button'))[0];
        cancel.triggerEventHandler('click', null);
        testHostFixture.detectChanges();
        input = testHostFixture.debugElement.queryAll(By.css('.open'));
        expect(input.length).toEqual(0);
    }));

    // function sendInput(inputElement, text: string) {
    //     testHostFixture.detectChanges();
    //     tick();
    //     inputElement.value = text;
    //     inputElement.dispatchEvent(new Event('keydown'));
    //     tick();
    //     testHostFixture.detectChanges();
    //     return testHostFixture.whenStable();
    // }

    // it('Should call gsfaList on text', fakeAsync(() => {
    //     let button: DebugElement = testHostFixture.debugElement.queryAll(By.css('.add-button'))[0];
    //     button.triggerEventHandler('click', null);
    //     testHostFixture.detectChanges();
    //     let openned: DebugElement[] = testHostFixture.debugElement.queryAll(By.css('.open'));
    //     expect(openned.length).toEqual(4);
    //     const input: DebugElement = testHostFixture.debugElement.queryAll(By.css('#inputText'))[0];
    //     let spy = spyOn(testHostComponent, "_filterGsfas").and.callThrough();
    //     sendInput(input.nativeElement, 'test');
    //     expect(spy).toHaveBeenCalled();
    // }));

    // it('Should set focus to input on button click', fakeAsync(() => {
    //     let button: DebugElement = testHostFixture.debugElement.queryAll(By.css('.add-button'))[0];
    //     //button.triggerEventHandler('click', { target: button.nativeElement });
    //     button.nativeElement.click();
    //     testHostFixture.detectChanges();
    //     let input: DebugElement = testHostFixture.debugElement.queryAll(By.css('input'))[0];
    //     console.log('input=', input);
    //     testHostFixture.detectChanges();
    //     let focussed: DebugElement = testHostFixture.debugElement.queryAll(By.css(':focus'))[0];
    //     console.log('focussed=', focussed);
    //     expect(focussed === input).toBe(true);
    // }));
});
