import { Observable } from 'rxjs/Observable';
import { OAuthModule } from 'angular-oauth2-oidc';
import { TestBed, inject, getTestBed } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { DrgsRepartitionService } from './drgs-repartition.service';
import { RestService } from '../../../shared/services/network/rest.service';
import { MockRestService } from '../../../shared/services/network/rest.service.mock';
import { MockConfigService } from '../../../shared/services/config/config.service.mock';
import { ConfigService } from '../../../shared/services/config/config.service';
import { DateToMysqlDatePipe } from '../pipes/date-to-mysql-date.pipe';

@Injectable()
class UrlsProvider {
    onGet(uri: string) {
        console.log(uri);
        switch (uri) {
            case '/v1/drgs/username/statuses/someStatus':
            case '/v1/drgs/username/statuses/someStatus/?startDate=2018-01-01':
            case '/v1/drgs/username/statuses/someStatus/?startDate=2018-01-01&endDate=2018-12-31':
            case '/v1/drgs/username/statuses/?startDate=2018-01-01&endDate=2018-12-31':
            case '/v1/drgs/username/statuses/?startDate=2018-01-01':
            case '/v1/drgs/username/statuses/?endDate=2018-12-31':
                return [];
            default:
                return undefined;
        }
    }
}

describe('DrgsRepartitionService', () => {

    let service: DrgsRepartitionService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                DateToMysqlDatePipe,
                DrgsRepartitionService,
                UrlsProvider,
                { provide: RestService, useClass: MockRestService, deps: [UrlsProvider] },
                { provide: ConfigService, useClass: MockConfigService },
            ]
        });
        service = getTestBed().get(DrgsRepartitionService);
    });

    it('should be injectable', inject([DrgsRepartitionService], (service: DrgsRepartitionService) => {
        expect(service).toBeDefined();
        expect(service instanceof DrgsRepartitionService).toBe(true);
    }));

    it('getByStatuses with only the status', done => {
        service.getByStatuses('username', 'someStatus')
            .subscribe(result => { expect(result).toEqual([]); done() });
    });

    it('getByStatuses with the status and a start date', done => {
        service.getByStatuses('username', 'someStatus', '2018-01-01')
            .subscribe(result => { expect(result).toEqual([]); done() });
    });

    it('getByStatuses with the status and a start date and an end date', done => {
        service.getByStatuses('username', 'someStatus', '2018-01-01', '2018-12-31')
            .subscribe(result => { expect(result).toEqual([]); done() });
    });

    it('getByStatuses with no status and a start date and an end date', done => {
        service.getByStatuses('username', undefined, '2018-01-01', '2018-12-31')
            .subscribe(result => { expect(result).toEqual([]); done() });
    });

    it('getByStatuses with only a start date', done => {
        service.getByStatuses('username', undefined, '2018-01-01')
            .subscribe(result => { expect(result).toEqual([]); done() });
    });

    it('getByStatuses with only an end date', done => {
        service.getByStatuses('username', undefined, undefined, '2018-12-31')
            .subscribe(result => { expect(result).toEqual([]); done() });
    });
});
