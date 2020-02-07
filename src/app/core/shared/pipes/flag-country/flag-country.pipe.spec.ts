import { TestBed, getTestBed } from '@angular/core/testing';
import { FlagCountryPipe } from './flag-country.pipe';
import { Country } from '../../services/country/country.model';

describe('FlagCountryPipe', () => {

    let pipe: FlagCountryPipe;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [FlagCountryPipe]
        });
        pipe = getTestBed().get(FlagCountryPipe);
    });

    it('should exist', () => {
        expect(FlagCountryPipe).toBeDefined();
    });

    it('create an instance', () => {
        const pipe = new FlagCountryPipe();
        expect(pipe).toBeTruthy();
    });

    it('should return empty string on undefined id', () => {
        let country: Country = new Country('Spain', 'France');
        country.id = undefined;
        expect(pipe.transform(country)).toEqual('');
    });

    it('should throw an exception on empty value', () => {
        expect(() => pipe.transform(null)).toThrow();
    });

    it('should return the right image url', () => {
        let country: Country = new Country('Spain', 'France');
        expect(pipe.transform(country)).toEqual('assets/images/countries/spain.png');
    });

});
