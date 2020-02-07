import { UserCardComponent } from './user-card.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SharedModule } from '../../../../shared/shared.module';
import { MOCK_CONSTANTS } from '../../../../mocks.constants';


describe('UserCardComponent', () => {
    let component: UserCardComponent;
    let fixture: ComponentFixture<UserCardComponent>;
    let expectedUser: any;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                SharedModule
            ],
            declarations: [UserCardComponent],
            providers: [
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(UserCardComponent);
        component = fixture.componentInstance;
        // expectedUser = new User(MOCK_CONSTANTS.getUsers[0]);
        expectedUser = JSON.parse(MOCK_CONSTANTS.getUsers)[0];
        component.user = expectedUser;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
