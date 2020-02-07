import { MockConfigService } from './../../../../shared/services/config/config.service.mock';
import { Organization } from './organization.model';
import { Observable } from 'rxjs/Observable';
import { ConfigService } from './../../../../shared/services/config/config.service';
import { OAuthModule } from 'angular-oauth2-oidc';
import { SharedModule } from './../../../../shared/shared.module';
import { RestService } from './../../../../shared/services/network/rest.service';
import { TestBed, inject, getTestBed } from '@angular/core/testing';
import { OrganizationService } from './organization.service';
import { Injectable } from '@angular/core';
import { MockRestService } from '../../../../shared/services/network/rest.service.mock';

const MOCK_ORGANIZATIONS = [
    { id: 'o1', countryFr: 'France', countryEn: 'France', currencyCode: 'CC', distributionFees: 1, suppliersCount: 10 },
    { id: 'o2', countryFr: 'Italie', countryEn: 'Italy', currencyCode: 'CC', distributionFees: 2, suppliersCount: 20 },
    { id: 'o3', countryFr: 'Espagne', countryEn: 'Spain', currencyCode: 'CC', distributionFees: 3, suppliersCount: 30 },
]

@Injectable()
class UrlsProvider {

    onGet(uri: string) {
        switch (uri) {
            case '/v1/organisations':
                return MOCK_ORGANIZATIONS;
            default:
                return undefined;
        }
    }
}

describe('OrganizationService', () => {

    let service: OrganizationService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                SharedModule,
                OAuthModule.forRoot(),
            ],
            providers: [
                OrganizationService,
                UrlsProvider,
                { provide: RestService, useClass: MockRestService, deps: [UrlsProvider] },
                { provide: ConfigService, useClass: MockConfigService },
            ]
        });
        service = getTestBed().get(OrganizationService);
    });

    it('should be injectable', inject([OrganizationService], (service: OrganizationService) => {
        expect(service).toBeDefined();
        expect(service instanceof OrganizationService).toBe(true);
    }));

    it('should get orgnizations list', done => {
        service.getOrganizationList().subscribe(orgs => {
            expect(orgs.length).toEqual(3);
            orgs.forEach(org => expect(org instanceof Organization).toBe(true));
            done();
        })
    });
});
