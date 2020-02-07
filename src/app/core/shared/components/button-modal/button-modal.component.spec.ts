import { CoreModule } from './../../../core.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonModalComponent } from './button-modal.component';

describe('ButtonModalComponent', () => {
    let component: ButtonModalComponent;
    let fixture: ComponentFixture<ButtonModalComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [CoreModule]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ButtonModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
