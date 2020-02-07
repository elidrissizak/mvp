import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
    selector: 'month-year-picker',
    templateUrl: 'month-year-picker.component.html',
    styleUrls: ['month-year-picker.component.scss']
})
export class MonthYearPickerComponent {

    public nbYears = 5;
    public years = [];
    public months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    public selectedMonth = undefined;
    public selectedYear = undefined;
    public hideYears = false;
    @Output('on-selected') onDone = new EventEmitter();
    @Input('disabled') disabled = false;

    @Output('on-month-click') onMonthClickEvent = new EventEmitter();
    @Output('on-year-click') onYearClickEvent = new EventEmitter();

    constructor() {
        let currentYear = (new Date()).getFullYear();
        this.years = Array(this.nbYears).fill('').map((d, i) => currentYear - i).reverse();
    }

    ngOnInit() {
        this.reset();
    }

    reset() {
        this.selectedMonth = undefined;
        this.selectedYear = undefined;
        this.disabled = false;
    }

    public onMonthClick(month) {
        this.selectedMonth = month;
        this.disabled = true;
        this.onMonthClickEvent.emit(month);
    }

    public onYearClick(year) {
        this.selectedYear = year;
        this.onYearClickEvent.emit(year);
        this.onDone.emit(new Date(this.selectedYear, this.selectedMonth));
    }
}
