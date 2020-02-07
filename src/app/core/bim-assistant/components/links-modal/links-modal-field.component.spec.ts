import { CommonModule } from '@angular/common';
import { ModalModule, BsModalRef } from 'ngx-bootstrap';
import { CoreModule } from './../../../core.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LinksModalFieldComponent } from './links-modal-field.component';

describe('LinksModalFieldComponent', () => {
    let component: LinksModalFieldComponent;
    let fixture: ComponentFixture<LinksModalFieldComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ModalModule.forRoot()],
            declarations: [LinksModalFieldComponent],
            providers: [BsModalRef]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LinksModalFieldComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
