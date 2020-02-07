import { TestBed, getTestBed, async } from '@angular/core/testing';
import { CountryPipe } from './country.pipe';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../../../shared/services/language/language.service';
import { Country } from '../../services/country/country.model';

describe('CountryPipe', () => {

    let pipe: CountryPipe;
    let languageService: LanguageService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TranslateModule.forRoot()],
            providers: [CountryPipe, LanguageService,]
        });
        pipe = getTestBed().get(CountryPipe);
        languageService = getTestBed().get(LanguageService);
    });

    it('should exist', async(() => {
        expect(CountryPipe).toBeDefined();
    }));

    it('create an instance', () => {
        const pipe = new CountryPipe(undefined);
        expect(pipe).toBeTruthy();
    });

    it('should work in french', () => {
        let val = new Country('Spain', 'Espagne');
        languageService.setLanguage('fr')
        expect(pipe.transform(val)).toEqual('Espagne');
    });

    it('should work in english', () => {
        let val = new Country('Spain', 'Espagne');
        languageService.setLanguage('en')
        expect(pipe.transform(val)).toEqual('Spain');
    });

    it('should return in english if language unknown', () => {
        let val = new Country('Spain', 'Espagne');
        languageService.setLanguage('de')
        expect(pipe.transform(val)).toEqual('Spain');
    });

    it('should throw an exception on empty value', () => {
        expect(() => pipe.transform(null)).toThrow();
    });


});
