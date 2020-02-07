import { Country } from './country.model';
import { Organization } from '../organization/organization.model';
import { Injectable } from '@angular/core';

@Injectable()
export class CountryService {

  constructor() { }

  getCountriesFromOrganizations(organizationsList: Organization[]): Country[] {
    return organizationsList
      // Create an array of Coutries
      .map(organization => organization.country)
      // Filter the previous array to only get an array of unique countries
      .filter((country, index, self) => self.findIndex(c => c.id === country.id) === index);
  }

}
