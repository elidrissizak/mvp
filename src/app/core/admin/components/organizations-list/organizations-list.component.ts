import { CurrencyService } from './../../../shared/services/currency/currency.service';
import { Country } from '../../../shared/services/country/country.model';
import { CountryService } from '../../../shared/services/country/country.service';
import { Observable } from 'rxjs/Rx';
import { Organization } from '../../../shared/services/organization/organization.model';
import { OrganizationService } from '../../../shared/services/organization/organization.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-organizations-list',
    templateUrl: 'organizations-list.component.html',
    styleUrls: ['./organizations-list.component.scss']
})
export class OrganizationsListComponent implements OnInit {

    organizations: Organization[];
    organizationsSorted: Organization[];
    countries: Country[];
    currencies: {};

    allCountryLabel = 'all';
    countrySelected: string;

    constructor(
        private organizationService: OrganizationService,
        private countryService: CountryService,
        private currencyService: CurrencyService
    ) { }

    ngOnInit() {
        Observable.forkJoin(this._getCurrencies(), this._getOrganizations()).subscribe();
        this.countrySelected = this.allCountryLabel;
    }

    private _getOrganizations() {
        return this.organizationService.getOrganizationList()
            .map(organizationsList => {
                this.organizations = organizationsList;
                this.organizationsSorted = this.organizations;
                this.countries = this.countryService.getCountriesFromOrganizations(this.organizations);
            });
    }

    private _getCurrencies() {
        return this.currencyService.getCurrencies()
            .map(currencies =>
                // Transform currencies array to object for id indexing.
                this.currencies = currencies.reduce((prev, cur) => { prev[cur.id] = cur; return prev; }, {}));

    }

    updateOrganisationSorted() {
        const allOrganizations = this.organizations;
        const organizationFiltered = this.organizations.filter(o => o.country.id === this.countrySelected);
        this.organizationsSorted = (this.countrySelected === this.allCountryLabel) ? allOrganizations : organizationFiltered;
    }

}
