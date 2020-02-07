import { LinksModalFieldComponent } from './links-modal-field.component';
import { CommonModule } from '@angular/common';
import { ModalModule, BsModalRef } from 'ngx-bootstrap';
import { LinksModalComponent } from 'app/core/bim-assistant/components/links-modal/links-modal.component';
import { CoreModule } from './../../../core.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IconComponent } from './../../../../shared/components/icon/icon.component';
import { LinksService } from 'app/core/bim-assistant/services/links.service';

describe('LinksModalComponent', () => {
    let component: LinksModalComponent;
    let fixture: ComponentFixture<LinksModalComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ModalModule.forRoot()],
            declarations: [LinksModalComponent, LinksModalFieldComponent, IconComponent],
            providers: [BsModalRef]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LinksModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
