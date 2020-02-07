import { MysqlDateToDatePipe } from './mysql-date-to-date.pipe';

import { CurrencyPipe } from '@angular/common';
import { TestBed, async, getTestBed } from '@angular/core/testing';
import { Injector } from "@angular/core/src/di";

describe('MysqlDateToDatePipe', () => {

    let pipe: MysqlDateToDatePipe;
    let injector: Injector;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [MysqlDateToDatePipe]
        });
        pipe = getTestBed().get(MysqlDateToDatePipe);
    });

    it('should exist', async(() => {
        expect(MysqlDateToDatePipe).toBeDefined();
    }));

    it('should throw an error on invalid value', async(() => {
        expect(() => pipe.transform('xxxx')).toThrowError();
    }));

    it('should throw an error on invalid month', async(() => {
        expect(() => pipe.transform('2017-25-01.')).toThrowError();
    }));

    it('should throw an error on invalid day', async(() => {
        expect(() => pipe.transform('2017-01-42.')).toThrowError();
    }));

    it('should return a date object', async(() => {
        expect(pipe.transform('2017-01-01') instanceof Date).toEqual(true);
    }));

    it('should work', async(() => {
        let d = pipe.transform('2017-01-01');
        expect(d.getFullYear()).toEqual(2017);
        expect(d.getMonth()).toEqual(0);
        expect(d.getDate()).toEqual(1);
    }));

});

