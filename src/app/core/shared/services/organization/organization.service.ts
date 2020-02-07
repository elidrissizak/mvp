import { Currency } from './../currency/currency.service';
import { Country } from '../country/country.model';
import { RestService } from '../../../../shared/services/network/rest.service';
import { Observable } from 'rxjs/Rx';
import { Organization } from './organization.model';
import { Injectable } from '@angular/core';

@Injectable()
export class OrganizationService {

    constructor(private restService: RestService) { }

    getOrganizationList(): Observable<Organization[]> {
        return this.restService.get('/v1/organisations', { filter: { country: '' } })
            .map((data: any[]) => {
                return data.map((organization: any) => {
                    return new Organization(
                        organization.id,
                        new Country(organization.countryEn, organization.countryFr),
                        organization.suppliersCount,
                        organization.currencyCode,
                        organization.distributionFees
                    );
                });
            });
    }

    updateDistributionFees(organization: Organization) {
        return this.restService.patch('/v1/organisations', organization);
    }
}
