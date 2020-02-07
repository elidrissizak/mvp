import { DateToMysqlDatePipe } from './date-to-mysql-date.pipe';
import { CurrencyPipe } from '@angular/common';
import { TestBed, async, getTestBed } from '@angular/core/testing';
import { Injector } from "@angular/core/src/di";

describe('DateToMysqlDatePipe', () => {

    let pipe: DateToMysqlDatePipe;
    let injector: Injector;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                DateToMysqlDatePipe
            ]
        });
        injector = getTestBed();
        pipe = injector.get(DateToMysqlDatePipe);
    });

    it('should exist', async(() => {
        expect(DateToMysqlDatePipe).toBeDefined();
    }));

    it('should return an empty string on undefined value', async(() => {
        let val;
        expect(pipe.transform(val)).toEqual('');
    }));

    it('should return an empty string on null value', async(() => {
        let val = null;
        expect(pipe.transform(val)).toEqual('');
    }));

    it('should work', async(() => {
        expect(pipe.transform(new Date(2017, 0, 1))).toEqual('2017-01-01');

    }));

});
