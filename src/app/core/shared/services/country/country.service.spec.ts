import { Organization } from './../organization/organization.model';
import { TestBed, inject, getTestBed } from '@angular/core/testing';
import { CountryService } from './country.service';
import { Country } from './country.model';

describe('CountryService', () => {

    let service: CountryService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [CountryService]
        });
        service = getTestBed().get(CountryService);
    });

    it('should be created', inject([CountryService], (service: CountryService) => {
        expect(service).toBeTruthy();
    }));

    it('should return countries from organizations', () => {
        let country1: Country = new Country('France', 'France');
        let country2: Country = new Country('UK', 'Royaumes-Unis');
        let country3: Country = new Country('Spain', 'Espagne');
        let orgs: Array<Organization> = [
            new Organization('o01', country1, 1, 'CC', 10),
            new Organization('o02', country2, 1, 'CC', 10),
            new Organization('o03', country2, 1, 'CC', 10),
            new Organization('o04', country1, 1, 'CC', 10),
            new Organization('o05', country3, 1, 'CC', 10),
        ]
        let countries = service.getCountriesFromOrganizations(orgs);
        expect(countries.length).toEqual(3);
        expect(countries.includes(country1)).toBe(true);
        expect(countries.includes(country2)).toBe(true);
        expect(countries.includes(country3)).toBe(true);
    });
});
