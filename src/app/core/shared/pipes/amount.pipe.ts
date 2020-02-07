import { CurrencyPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';


@Pipe({ name: 'amount' })
export class AmountPipe implements PipeTransform {

    constructor(private currencyPipe: CurrencyPipe) { }

    transform(value: string): any {
        let n = parseFloat(value);
        if (n > 999999) {
            return (n / 1000000).toFixed(2) + 'M';
        }
        return this.currencyPipe.transform(value, 'EUR', true, '1.0-0')
            .substr(1)
            .split(',').join(' ');
    }
}
