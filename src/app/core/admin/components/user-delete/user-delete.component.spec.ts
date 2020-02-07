import { ModalModule, BsModalRef } from 'ngx-bootstrap/modal';
import { CoreModule } from './../../../core.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDeleteComponent } from './user-delete.component';

describe('UserDeleteComponent', () => {
    let component: UserDeleteComponent;
    let fixture: ComponentFixture<UserDeleteComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [CoreModule, ModalModule.forRoot()],
            providers: [BsModalRef]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(UserDeleteComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
