import { LanguageService } from '../../../../shared/services/language/language.service';
import { Country } from '../../services/country/country.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'translateCountry',
    pure: false
})
export class CountryPipe implements PipeTransform {

    constructor(private languageService: LanguageService) { }

    transform(value: Country): string {
        if (!value) {
            throw new Error('CountryPipe : empty value given !');
        }
        return this.languageService.getLanguage() === 'fr' ? value.labelFR : value.labelEN;
    }

}
