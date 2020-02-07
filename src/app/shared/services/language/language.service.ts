import { Observable } from 'rxjs/Rx';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';

@Injectable()
export class LanguageService {

    private _language = 'en';

    private _onLanguageSwitch: ReplaySubject<string>;

    constructor(private translateService: TranslateService) {
        this.translateService.setDefaultLang(this._language);
        this._onLanguageSwitch = new ReplaySubject<string>(10);
    }

    setLanguage(language: string): void {
        this._language = language;
        this.translateService.use(this._language);
        this._onLanguageSwitch.next(this._language);
    }

    onLanguageSwitch(): Observable<string> {
        return this._onLanguageSwitch.asObservable();
    }

    getLanguage(): string {
        return this._language;
    }

    getBrowserLanguage(): string {
        return this.translateService.getBrowserLang();
    }
}
