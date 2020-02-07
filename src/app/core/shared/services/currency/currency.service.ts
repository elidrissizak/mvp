import { Observable } from 'rxjs/Rx';
import { RestService } from './../../../../shared/services/network/rest.service';
import { Injectable } from '@angular/core';

export interface Currency {
    id: string;
    frenchLabel: string;
    englishLabel: string;
}

@Injectable()
export class CurrencyService {

    constructor(private restService: RestService) { }

    getCurrencies(): Observable<Array<Currency>> {
        return this.restService.get('/v1/currencies/');
    }
}
