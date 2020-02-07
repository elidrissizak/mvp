import { Injectable } from '@angular/core';

export interface Period {
    startDate: Date;
    endDate: Date;
}

@Injectable()
export class PeriodService {

    createPeriod(nbYears) {
        let now = new Date();
        let todayYear = now.getFullYear();
        let todayMonth = now.getMonth();
        let startDate = new Date(todayYear - nbYears, todayMonth, 1);
        startDate.setDate(1);
        let endDate = new Date(todayYear, todayMonth - 1, (new Date(todayYear, todayMonth, 0)).getDate())
        return { startDate, endDate }
    }
}
