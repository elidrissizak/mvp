import { TranslateService } from '@ngx-translate/core';
import { TestBed, async, getTestBed } from '@angular/core/testing';
import { Injector } from "@angular/core/src/di";
import { LanguageService } from './language.service';
import { SharedModule } from '../../shared.module';


describe('LanguageService', () => {

    let languageService: LanguageService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                SharedModule
            ],
            providers: [
                LanguageService
            ]
        });
        languageService = getTestBed().get(LanguageService);
    });

    it('should exist', () => {
        expect(LanguageService).toBeDefined();
        expect(languageService).toBeDefined();
    });

    it('get the browser language', async(() => {
        expect(languageService.getBrowserLanguage()).toBeTruthy();
        expect(typeof languageService.getBrowserLanguage()).toEqual('string');
    }));


});
