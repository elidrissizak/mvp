import { CurrencyPipe } from '@angular/common';
import { AmountPipe } from './amount.pipe';
import { TestBed, async, getTestBed } from '@angular/core/testing';
import { Injector } from "@angular/core/src/di";

describe('AmountPipe', () => {

    let amountPipe: AmountPipe;
    let injector: Injector;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                //CommonModule
            ],
            providers: [
                CurrencyPipe, // no comprendo
                AmountPipe
            ]
        });
        injector = getTestBed();
        amountPipe = injector.get(AmountPipe);
    });

    it('should exists', async(() => {
        expect(amountPipe).toBeDefined();
    }));

    it('should throw an error on empty value', async(() => {
        let empty;
        expect(() => amountPipe.transform(empty)).toThrowError();
    }));

    it('should throw an error on non number value', async(() => {
        expect(() => amountPipe.transform('non number value')).toThrowError();
    }));

    it('should return valid value with spaces', async(() => {
        expect(amountPipe.transform('1')).toEqual('1');
        expect(amountPipe.transform('10')).toEqual('10');
        expect(amountPipe.transform('100')).toEqual('100');
        expect(amountPipe.transform('1000')).toEqual('1 000');
        expect(amountPipe.transform('10000')).toEqual('10 000');
        expect(amountPipe.transform('100000')).toEqual('100 000');
        expect(amountPipe.transform('1000000')).toEqual('1.00M');
    }));
});
