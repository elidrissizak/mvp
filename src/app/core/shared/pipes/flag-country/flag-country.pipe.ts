import { Country } from '../../services/country/country.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'flagCountry'
})
export class FlagCountryPipe implements PipeTransform {

    transform(value: Country): any {
        if (!value) {
            throw new Error('FlagCountryPipe : empty value given !');
        }
        if (value.id === undefined) {
            return ''; // to skip the "garbage organization". Remove this line
        }
        return `assets/images/countries/${value.labelEN.toLowerCase()}.png`;
    }
}

