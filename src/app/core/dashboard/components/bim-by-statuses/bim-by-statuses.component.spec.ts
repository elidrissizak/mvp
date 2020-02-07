import { DrgsRepartitionService } from './../../../shared/services/drgs-repartition.service';
import { SessionService } from './../../../../shared/services/session/session.service';
import { BimDataConverter } from './../../services/bim-data-converter.service';
import { User } from './../../../../shared/entities/user/user.entity';
import { Observable } from 'rxjs/Rx';
import { OAuthModule } from 'angular-oauth2-oidc';
import { BimByStatusesComponent } from './bim-by-statuses.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TestBed, async, getTestBed, ComponentFixture } from '@angular/core/testing';
import { Injector } from "@angular/core/src/di";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { SharedModule } from '../../../../shared/shared.module';

class MockSessionService {
    getLoggedUser() {
        return new User();
    }
}

class MockDrgsRepartitionService {
    getByStatuses(login: string) {
        return Observable.of([]);
    }
}

describe('BimByStatusesComponent', () => {

    let component: BimByStatusesComponent;
    let fixture: ComponentFixture<BimByStatusesComponent>;
    let monthsEl: Array<DebugElement>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                SharedModule,
            ],
            declarations: [BimByStatusesComponent],
            providers: [
                BimDataConverter,
                { provide: SessionService, useClass: MockSessionService },
                { provide: DrgsRepartitionService, useClass: MockDrgsRepartitionService }
            ],

        });
        // fixture = TestBed.createComponent(BimByStatusesComponent);
        // component = fixture.componentInstance;
        // fixture.detectChanges();

    });

    it('should be defined', async(() => {
        //expect(component).toBeDefined();
        // spyOn(component, 'onMonthClick');
        // component.disabled = false;
        // fixture.detectChanges();
        // monthsEl = fixture.debugElement.queryAll(By.css('.month'))
        // monthsEl[0].nativeElement.click();
        // fixture.whenStable().then(() => {
        //     expect(component.onMonthClick).toHaveBeenCalled();
        // })
    }));
});
