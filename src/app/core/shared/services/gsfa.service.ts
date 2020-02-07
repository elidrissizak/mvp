import { Observable } from 'rxjs/Rx';
import { RestService } from './../../../shared/services/network/rest.service';
import { Injectable } from '@angular/core';
import { LanguageService } from '../../../shared/services/language/language.service';

export interface Gsfa {
    id: number;
    frenchLabel: string;
    englishLabel: string;
}

@Injectable()
export class GsfaService {

    constructor(private restService: RestService, private languageService: LanguageService) { }

    getGsfas(): Observable<Array<Gsfa>> {
        return this.restService.get('/v1/gsfas');
    }
}
