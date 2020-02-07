import { MockConfigService } from './../../../../shared/services/config/config.service.mock';
import { ConfigService } from './../../../../shared/services/config/config.service';
import { RestService } from './../../../../shared/services/network/rest.service';
import { CurrencyService } from './currency.service';
import { Observable } from 'rxjs/Rx';
import { OAuthModule } from 'angular-oauth2-oidc';
import { HttpModule, XHRBackend, Response, ResponseOptions, ResponseType } from '@angular/http';
import { inject, TestBed, async, getTestBed } from '@angular/core/testing';
import { Injector } from "@angular/core/src/di";
import { MockConnection, MockBackend } from '@angular/http/testing';
import { Injectable } from '@angular/core';
import { MockRestService } from '../../../../shared/services/network/rest.service.mock';
import { SharedModule } from '../../../../shared/shared.module';

const MOCK_CURRENCIES = [
    { id: 'c1', frenchLabel: 'euro', englishLabel: 'euro' },
    { id: 'c2', frenchLabel: 'dollar', englishLabel: 'dollar' },
    { id: 'c3', frenchLabel: 'livre', englishLabel: 'pound' }
]

@Injectable()
class UrlsProvider {
    onGet(uri: string) {
        switch (uri) {
            case '/v1/currencies/':
            default:
                return MOCK_CURRENCIES;
        }
    }
}

describe('CurrencyService', () => {

    let service: CurrencyService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                SharedModule,
                OAuthModule.forRoot(),
            ],
            providers: [
                CurrencyService,
                UrlsProvider,
                { provide: RestService, useClass: MockRestService, deps: [UrlsProvider] },
                { provide: ConfigService, useClass: MockConfigService },
            ]
        });
        service = getTestBed().get(CurrencyService);
    });

    it('should exist', async(() => {
        expect(CurrencyService).toBeDefined();
    }));

    it('should be injectable', inject([CurrencyService], (service: CurrencyService) => {
        expect(service).toBeTruthy();
        expect(service instanceof CurrencyService).toBe(true);
    }));

    it('should return currencies', done => {
        service.getCurrencies().subscribe(currencies => {
            expect(currencies.length).toEqual(MOCK_CURRENCIES.length);
            currencies.forEach((c, i) => expect(c.id === MOCK_CURRENCIES[i].id).toBe(true));
            currencies.forEach((c, i) => expect(c.frenchLabel === MOCK_CURRENCIES[i].frenchLabel).toBe(true));
            currencies.forEach((c, i) => expect(c.englishLabel === MOCK_CURRENCIES[i].englishLabel).toBe(true));
            done();
        });
    });
});
