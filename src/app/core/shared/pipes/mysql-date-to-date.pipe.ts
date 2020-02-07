import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'MysqlDateToDate' })
export class MysqlDateToDatePipe implements PipeTransform {

    transform(value: string): Date {
        if (!value) return undefined;
        if (/\d{4}-\d{2}-\d{2}/.test(value) === false) {
            throw new Error('MysqlDateToDatePipe: invalid value ' + value);
        }
        let t = value.split('-');
        let year = parseInt(t[0]);
        let month = parseInt(t[1]);
        if (month < 1 || month > 12) {
            throw new Error('MysqlDateToDatePipe: invalid month ' + month);
        }
        let day = parseInt(t[2]);
        if (day < 1 || day > 31) {
            throw new Error('MysqlDateToDatePipe: invalid day ' + day);
        }
        return new Date(year, month - 1, day);

    }
}
