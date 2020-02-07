import { Token } from './session.service';
import { OAuthService } from 'angular-oauth2-oidc';
import { SessionService } from './../session/session.service';
import { ConfigService } from './../config/config.service';
import { APP_CONSTANTS } from './../../app.constants';
import { HttpModule, XHRBackend, Response, ResponseOptions } from '@angular/http';
import { inject, TestBed, async, getTestBed } from '@angular/core/testing';
import { Injector } from "@angular/core/src/di";
import { MockBackend, MockConnection } from "@angular/http/testing";

class MockOAuthService {
    getAccessToken() {
        return 'accessToken';
    }
}

describe('SessionService', () => {

    let sessionService: SessionService;
    let injector: Injector;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpModule
            ],
            providers: [
                SessionService,
                { provide: OAuthService, useClass: MockOAuthService },
            ]
        });
        sessionService = getTestBed().get(SessionService);
    });

    it('should exist', () => {
        expect(SessionService).toBeDefined();
        expect(sessionService).toBeDefined();
    });

    it('should open an anonymous session', () => {
        sessionService.openAnonymousSession().subscribe(
            data => expect(data).toBeUndefined(),
            () => fail());
    });

    it('should open a session', () => {
        let token: Token;
        sessionService.openSession(token).subscribe(
            data => expect(data).toEqual(true),
            () => fail());
    });

    it('should store user infos in localStorage', () => {
        let user = {
            firstName: 'first name',
            lastName: 'last name',
            userName: 'name',
            name: 'name'
        };
        sessionService.setUserInfo(user.firstName, user.lastName, user.userName);
        expect(localStorage.getItem('username')).toEqual(user.name);
    });
});
