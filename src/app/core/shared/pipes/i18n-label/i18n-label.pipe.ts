import { LanguageService } from '../../../../shared/services/language/language.service';
import { Country } from '../../services/country/country.model';
import { Pipe, PipeTransform } from '@angular/core';

/**
 * Some labels are given by the server, therefore are not in fr/en.json files.  
 * The defined attributes are englishLabel and frenchLabel.  
 * So, when we have an object, we expect to find these 2 attributes.  
 * This i18nLabel pipe is used to display the correct attribute in a template.
 * Note that the pipe is not pure : it will be called for each change detection
 * (needed in bim-by-deductions.component)
 */
@Pipe({
    name: 'i18nLabel',
    pure: false
})
export class I18nLabelPipe implements PipeTransform {

    constructor(private languageService: LanguageService) { }

    transform(value: { englishLabel: string, frenchLabel: string }): string {
        if (!value) {
            throw new Error('I18nLabelPipe : empty value !');
        }
        const language = this.languageService.getLanguage();
        return language === 'fr' ? value.frenchLabel : value.englishLabel;
    }
}
