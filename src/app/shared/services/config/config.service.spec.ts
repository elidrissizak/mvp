import { APP_CONSTANTS } from './../../app.constants';
import { HttpModule, XHRBackend, Response, ResponseOptions } from '@angular/http';
import { ConfigService } from './config.service';
import { inject, TestBed, async, getTestBed } from '@angular/core/testing';
import { Injector } from "@angular/core/src/di";
import { MockBackend, MockConnection } from "@angular/http/testing";

describe('ConfigService', () => {

    let configService: ConfigService;
    let injector: Injector;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpModule
            ],
            providers: [
                ConfigService,
                { provide: XHRBackend, useClass: MockBackend },
            ]
        });
        injector = getTestBed();
    });

    it('should exist',
        inject([ConfigService, XHRBackend], (configService, mock) => {
            expect(configService).toBeDefined();
        }));

    it('should load config.json',
        inject([ConfigService, XHRBackend], (configService: ConfigService, mockBackend) => {
            let env = 'rf2.dok-dev.intra.renault.fr';
            mockBackend.connections.subscribe((connection: MockConnection) => {
                connection.mockRespond(new Response(new ResponseOptions({
                    body: APP_CONSTANTS.CONFIG[env]
                })));
            });
            configService.load('/config.json')
                .then(data => {
                    expect(data).toEqual(true)
                    expect(configService.get('oauth').CLIENT_ID).toEqual(APP_CONSTANTS.CONFIG[env].oauth.CLIENT_ID);
                });
        }));

});
