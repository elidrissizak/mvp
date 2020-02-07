import { MockRestService } from './../../../../shared/services/network/rest.service.mock';
import { DateToMysqlDatePipe } from './../../../shared/pipes/date-to-mysql-date.pipe';
import { MockSessionService } from './../../../../shared/services/session/session.service.mock';
import { SessionService } from './../../../../shared/services/session/session.service';
import { DrgsRepartitionService } from './../../../shared/services/drgs-repartition.service';
import { GroupbyBarComponent } from './groupby-bar.component';
import { MockConfigService } from './../../../../shared/services/config/config.service.mock';
import { RestService } from './../../../../shared/services/network/rest.service';
import { IconComponent } from './../../../../shared/components/icon/icon.component';
import { DeductionService } from './../../../shared/services/deduction/deduction.service';
import { ColorService } from './../../../shared/services/color.service';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule, Router } from '@angular/router';
import { CoreModule } from './../../../core.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { ConfigService } from './../../../../shared/services/config/config.service';

@Injectable()
class UrlsProvider {
    onGet() {
        return [];
    }
}

describe('GroupbyBarComponent', () => {
    let component: GroupbyBarComponent;
    let fixture: ComponentFixture<GroupbyBarComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TranslateModule.forRoot()],
            declarations: [GroupbyBarComponent, IconComponent],
            providers: [
                DrgsRepartitionService,
                DateToMysqlDatePipe,
                { provide: ConfigService, useClass: MockConfigService },
                { provide: SessionService, useClass: MockSessionService },
                UrlsProvider,
                { provide: RestService, useClass: MockRestService, deps: [UrlsProvider] }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(GroupbyBarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
