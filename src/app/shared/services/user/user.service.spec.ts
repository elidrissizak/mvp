import { RestService } from './../network/rest.service';
import { Observable } from 'rxjs/Rx';
import { OAuthModule } from 'angular-oauth2-oidc';
import { UserService } from './user.service';
import { SessionService } from './../session/session.service';
import { ConfigService } from './../config/config.service';
import { APP_CONSTANTS } from './../../app.constants';
import { HttpModule, XHRBackend, Response, ResponseOptions, ResponseType } from '@angular/http';
import { TestBed, async, getTestBed, inject } from '@angular/core/testing';
import { Injector } from "@angular/core/src/di";
import { MockBackend, MockConnection } from "@angular/http/testing";
import { Injectable } from '@angular/core';
import { User } from '../../entities/user/user.entity';
import { MockRestService } from '../network/rest.service.mock';
import { SharedModule } from '../../shared.module';

class MockSessionService {
    getLoggedUser() {
        return new User();
    }
    getToken() {
        return 'token';
    }
}

class MockConfigService {
    get(key) {
        return false; // mocked
    }
}
const MOCK_USER: User = {
    ipn: 'Ipn001',
    historyIpn: 'IpnH001',
    username: 'User name',
    email: 'name@domain.com',
    phone: '06512345678',
    firstName: 'first name',
    lastName: 'last name',
    roles: [],
    gsfas: [],
    organisation: 'FR01',
    creationDate: '',
    modificationDate: ''
};

@Injectable()
class UrlsProvider {

    onGet(uri: string) {
        switch (uri) {
            case '/v1/users/' + MOCK_USER.ipn.toUpperCase():
            case '/v1/users/unknown':
                return MOCK_USER;
            case '/v1/users?filter=':
                return (new Array(5))
                    .fill({})
                    .map((u, i) => ({ ...MOCK_USER, ipn: MOCK_USER.ipn + i }));
            default:
                return [];
        }
    }

    onPost(uri: string, params?: any) {
        switch (uri) {
            case '/v1/users':
                return MOCK_USER;
            default:
                return [];
        }
    }

    onPut = this.onPost;
}

describe('UserService', () => {

    let service: UserService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                SharedModule,
                OAuthModule.forRoot(),
            ],
            providers: [
                UserService,
                UrlsProvider,
                { provide: RestService, useClass: MockRestService, deps: [UrlsProvider] },
                { provide: ConfigService, useClass: MockConfigService },
            ]
        });
        service = getTestBed().get(UserService);
    });

    let _expectUser = (user, expectedIpn = MOCK_USER.ipn.toUpperCase()) => {
        expect(user.ipn).toEqual(expectedIpn);
        Object.keys(MOCK_USER)
            .filter(prop => prop !== 'ipn')
            .forEach(prop => expect(user[prop]).toEqual(MOCK_USER[prop]));

    }

    it('should retrieve an user by ipn', done => {
        service.getUserByIpn(MOCK_USER.ipn).subscribe(user => {
            _expectUser(user);
            done();
        });
    });

    it('should return an observable exception when ipn is missing', done => {
        service.getUserByIpn(undefined).subscribe(() => { }, error => done());
    });

    it('should return an observable exception when ipn is unknown', done => {
        service.getUserByIpn(undefined).subscribe(() => { }, error => done());
    });

    it('should create an user', done => {
        service.createUser(service.getEmptyUser()).subscribe((user: User) => {
            expect(user).toBeDefined();
            _expectUser(user);
            done();
        });
    });

    it('should update an user', done => {
        let updatedUser = { ...MOCK_USER };
        service.updateUser(updatedUser).subscribe((user: User) => {
            expect(user).toBeDefined();
            _expectUser(user);
            done();
        });
    });

    it('should get users', done => {
        service.getUsers().subscribe((users: Array<User>) => {
            expect(users).toBeDefined();
            expect(users.length).toEqual(5);
            //users.forEach((user, i) => _expectUser(user, user.ipn + i));
            done();
        });
    });


});
