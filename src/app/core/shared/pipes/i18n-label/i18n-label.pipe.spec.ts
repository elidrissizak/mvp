import { I18nLabelPipe } from './i18n-label.pipe';
import { TestBed, getTestBed, async } from '@angular/core/testing';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../../../shared/services/language/language.service';

describe('I18nLabelPipe', () => {

    let pipe: I18nLabelPipe;
    let languageService: LanguageService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TranslateModule.forRoot()],
            providers: [I18nLabelPipe, LanguageService,]
        });
        pipe = getTestBed().get(I18nLabelPipe);
        languageService = getTestBed().get(LanguageService);
    });

    it('should exist', async(() => {
        expect(I18nLabelPipe).toBeDefined();
    }));

    it('should work in french', () => {
        let val = { englishLabel: 'english', frenchLabel: 'français' };
        languageService.setLanguage('fr')
        expect(pipe.transform(val)).toEqual(val.frenchLabel);
    });

    it('should work in english', () => {
        let val = { englishLabel: 'english', frenchLabel: 'français' };
        languageService.setLanguage('en')
        expect(pipe.transform(val)).toEqual(val.englishLabel);
    });

    it('should return in english if language unknown ', () => {
        let val = { englishLabel: 'english', frenchLabel: 'français' };
        languageService.setLanguage('de')
        expect(pipe.transform(val)).toEqual(val.englishLabel);
    });

    it('should throw an exception on empty value', () => {
        expect(() => pipe.transform(null)).toThrow();
    });


});
