import { Country } from '../country/country.model';

/**
 * Represents an Organization.
 */
export class Organization {
  id: string;
  country: Country;
  suppliersCount: number;
  currencyCode: string;
  distributionFees: number;

  constructor(id: string, country: Country, suppliersCount: number, currencyCode: string, distributionFees: number) {
    this.id = id;
    this.country = country;
    this.suppliersCount = suppliersCount;
    this.currencyCode = currencyCode;
    this.distributionFees = distributionFees;
  }
}
