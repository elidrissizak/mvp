import { Component, EventEmitter, Output, ViewChild, Input, ElementRef } from '@angular/core';
import { Period } from '../../services/period.service';

@Component({
    host: {
        '(document:click)': 'onOutsideClick($event)',
    },
    selector: 'period-picker',
    templateUrl: 'period-picker.component.html',
    styleUrls: ['period-picker.component.scss']
})
export class PeriodPickerComponent {

    // initialPeriod can also be seen as an internal state.
    // Until the user submit the new period, we refer to initialPeriod.
    @Input('period') initialPeriod = undefined as Period; // angular-cli issue #2034
    public period: Period = { startDate: undefined, endDate: undefined };
    @Output('on-submit') onDone = new EventEmitter();
    @Output('on-close') onClose = new EventEmitter();

    @ViewChild('startDatePicker') startDatePicker;
    @ViewChild('endDatePicker') endDatePicker;
    public pickerVisible = false;
    public step = 'selectStartDate';

    constructor(private _eref: ElementRef) { }

    ngOnChanges(changes) {
        if (changes && changes.initialPeriod) {
            this.period = changes.initialPeriod.currentValue;
        }
    }

    // Showing or hiding the period picker does the same thing :
    // reset the step, and set back the initial period
    // (the period can only be updated through submit button)
    showPicker() {
        this.pickerVisible = !this.pickerVisible;
        this.step = 'selectStartDate';
        this.period = { ...this.initialPeriod };
    }

    onOutsideClick($event) {
        if (!this._eref.nativeElement.contains(event.target)) {
            this.pickerVisible = false;
        }
    }

    onStartSelected(date) {
        this.period.startDate = date;
        this.step = 'selectEndDate';
    }

    onEndSelected(date) {
        this.period.endDate = date;
        this.step = 'submitOrCancel';
    }

    lastNYears(nbYears) {
        this.period = this._nYears(nbYears);
        this.step = 'selectStartDate';
        this.startDatePicker.reset();
        this.endDatePicker.reset();
        this.step = 'submitOrCancel';
    }

    isNYears(nbYears) {
        let { startDate, endDate } = this._nYears(nbYears);
        return startDate.getMonth() === this.period.startDate.getMonth() &&
            startDate.getFullYear() === this.period.startDate.getFullYear() &&
            endDate.getMonth() === this.period.endDate.getMonth() &&
            endDate.getFullYear() === this.period.endDate.getFullYear();
    }

    private _nYears(nbYears) {
        let now = new Date();
        let todayYear = now.getFullYear();
        let todayMonth = now.getMonth();
        let startDate = new Date(todayYear - nbYears, todayMonth, 1);
        let endDate = new Date(
            todayYear,
            todayMonth - 1,
            (new Date(todayYear, todayMonth, 0)).getDate());
        return { startDate, endDate };
    }

    reset() {
        this.startDatePicker.reset();
        this.endDatePicker.reset();
        this.period = { ...this.initialPeriod };
        this.step = 'selectStartDate';
    }

    close() {
        this.period = { ...this.initialPeriod };
        this.pickerVisible = false;
        this.onClose.emit();
    }

    submit() {
        // Swap end/start if needed
        [this.period.startDate, this.period.endDate] =
            this.period.startDate > this.period.endDate
                ? [this.period.endDate, this.period.startDate]
                : [this.period.startDate, this.period.endDate];
        // startDate on the first day of month
        this.period.startDate.setDate(1);
        // endDay is the last day of month
        this.period.endDate.setDate((new Date(this.period.endDate.getFullYear(), this.period.endDate.getMonth() + 1, 0)).getDate());
        this.initialPeriod = { ... this.period };
        this.onDone.emit(this.period);
        this.pickerVisible = false;
        console.log("=> period", this.period );
    }
}
