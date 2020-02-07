import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'mysql-date' })
export class DateToMysqlDatePipe implements PipeTransform {

    constructor() { }

    transform(value: Date): any {
        if (!value) return '';
        const month = `00${value.getMonth() + 1}`.slice(-2);
        const day = `00${value.getDate()}`.slice(-2);
        return `${value.getFullYear()}-${month}-${day}`;
    }
}
