import { MockSessionService } from './../session/session.service.mock';
import { MockConfigService } from './../config/config.service.mock';
import { SessionService } from './../session/session.service';
import { ConfigService } from './../config/config.service';
import { RestService } from './rest.service';
import { APP_CONSTANTS } from './../../app.constants';
import { HttpModule, XHRBackend, Response, ResponseOptions, ResponseType } from '@angular/http';
import { inject, TestBed, async, getTestBed } from '@angular/core/testing';
import { Injector } from "@angular/core/src/di";
import { MockBackend, MockConnection } from "@angular/http/testing";
import { OAuthModule } from 'angular-oauth2-oidc';

class MockError extends Response implements Error {
    name: any;
    message: any;
}

describe('RestService', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpModule,
                OAuthModule.forRoot()
            ],
            providers: [
                RestService,
                { provide: ConfigService, useClass: MockConfigService },
                { provide: XHRBackend, useClass: MockBackend },
                { provide: SessionService, useClass: MockSessionService },
            ]
        });
    });

    let service;
    let mockBackend;

    beforeEach(inject([RestService, XHRBackend], (restService: RestService, aMockBackend) => {
        service = restService;
        mockBackend = aMockBackend;
    }));

    it('should throw observable error on get() when code is not 200',
        done => {
            mockBackend.connections.subscribe((connection: MockConnection) => {
                let ro = new ResponseOptions({
                    body: '{]',//JSON.stringify({ message: 'Gateway timeout' }),
                    status: 504,
                    type: ResponseType.Error
                });
                connection.mockError(new MockError(ro));
            });
            service.get('/something').subscribe(
                (data) => {
                    fail('there should be an error !' + JSON.stringify(data));
                    done();
                },
                data => {
                    console.log(data);
                    expect(data).toBeDefined();
                    expect(data.url).toBeDefined();
                    expect(data.code).toEqual(504);
                    expect(data.message).toBeDefined();
                    done();
                },
                () => {
                    fail('Should not be here (complete callback)');
                    done();
                });
        });


    it('should exist',
        inject([RestService, XHRBackend], (RestService, mock) => {
            expect(RestService).toBeDefined();
        }));

    let mocker = (body, test) => {
        mockBackend.connections.subscribe(
            (connection: MockConnection) => {
                let ro = new ResponseOptions({ body });
                let r = new Response(ro);
                return connection.mockRespond(r)
            });
        test();
    }

    it('should return true on successful health check', done =>
        mocker(
            { status: 'UP' },
            () => service.checkHealth().subscribe(
                data => { expect(data).toEqual(true); done() },
                () => { fail('should not be an error'); done() }))
    );

    it('should return false on health check when server has problems', done =>
        mocker(
            { status: 'DOWN' },
            () => service.checkHealth().subscribe(
                data => { expect(data).toEqual(false); done() },
                () => { fail('should be an error'); done() }
            ))
    );

    it('should throw observable error on get() with invalid json',
        done => mocker(
            '[}',
            () => service.get('/something').subscribe(
                () => { fail('there should be an error !'); done() },
                data => { expect(data).toBeDefined(); done() },
                () => { fail('Should not be here (complete callback)'); done() })
        ));


    let _expectedData = (data) => {
        expect(data).toBeDefined();
        expect(typeof data).toEqual('object');
        expect(data.name).toEqual('userName');
    };

    it('should give some json on success get()', done =>
        mocker(
            '{ "name": "userName" }',
            () => service.get('/something').subscribe(
                data => {
                    _expectedData(data);
                    done();
                },
                data => { fail('it should have successed'); done() }
            )));

    it('should give some json on success post()', done =>
        mocker(
            '{ "name": "userName" }',
            () => service.post('/something').subscribe(
                data => {
                    _expectedData(data);
                    done();
                },
                data => { fail('it should have successed'); done() }
            )));

    it('should throw observable error on post() with invalid json', done =>
        mocker(
            '[}',
            () => service.post('/something').subscribe(
                () => { fail('there should be an error !'); done() },
                data => { expect(data).toBeDefined(); done() },
                () => { fail('Should not be here (complete callback)'); done() }
            )))
});

