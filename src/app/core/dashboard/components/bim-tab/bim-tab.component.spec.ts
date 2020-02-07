import { MockSessionService } from './../../../../shared/services/session/session.service.mock';
import { ConfigService } from './../../../../shared/services/config/config.service';
import { PieComponent } from './../../../shared/components/pie/pie.component';
import { SessionService } from './../../../../shared/services/session/session.service';
import { HttpModule } from '@angular/http';
import { OAuthService } from 'angular-oauth2-oidc';
import { RestService } from './../../../../shared/services/network/rest.service';
import { Observable } from 'rxjs/Rx';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from './../../../../shared/shared.module';
import { BimTabComponent } from './bim-tab.component';
import { DebugElement, Injectable } from '@angular/core';
import { CoreModule } from './../../../core.module';
import { CoreComponent } from './../../../core.component';
import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { By } from "@angular/platform-browser";
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common/src/common_module';
import { MockConfigService } from '../../../../shared/services/config/config.service.mock';
import { MockRestService } from '../../../../shared/services/network/rest.service.mock';
import { MockOAuthService } from '../../../../shared/services/session/auth.service.mock';

@Injectable()
class UrlsProvider {
    onGet(uri: string) {
        switch (uri) {
            default:
                return [];
        }
    }
}

describe('BimTabComponent', () => {
    let component: BimTabComponent;
    let fixture: ComponentFixture<BimTabComponent>;

    let router = {
        navigate: jasmine.createSpy('navigate')
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                CoreModule,
                HttpModule,
                RouterTestingModule.withRoutes([]),
            ],
            providers: [
                SessionService,
                UrlsProvider,
                { provide: Router, useValue: router },
                { provide: ConfigService, useClass: MockConfigService },
                { provide: RestService, useClass: MockRestService, deps: [UrlsProvider] },
                { provide: SessionService, useClass: MockSessionService },
                { provide: OAuthService, useClass: MockOAuthService },
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(BimTabComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
