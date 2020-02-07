import { LanguageService } from './../../../../shared/services/language/language.service';
import { TaskService } from './../../../../shared/services/task/task.service';
import { DeductionService, Deduction } from './../../../shared/services/deduction/deduction.service';
import { Observable } from 'rxjs/Rx';
import { Component, ViewChild, Input, EventEmitter, Output, ElementRef } from '@angular/core';
import { ColorService } from '../../../shared/services/color.service';

@Component({
    host: {
        '(document:click)': 'onOutsideClick($event)',
    },
    selector: 'deductions-codes',
    templateUrl: 'codes-deductions.component.html',
    styleUrls: ['codes-deductions.component.scss']
})
export class DeductionsCodesComponent {
    @Input('with-supplier') withSupplier: boolean;
    @Input('selection-ids') selectionIds = new Array<number>();
    @Output('on-submit') onSubmit = new EventEmitter();
    deductions: Array<Deduction>;
    nbSelected: number;
    public deductionVisible = false;

    constructor(
        private taskService: TaskService,
        private deductionService: DeductionService,
        private colorService: ColorService,
        private languageService: LanguageService,
        private _eref: ElementRef) { }

    ngOnInit() {
        this._fetchDeductions()
            .subscribe(() => {
                this.selectionIds = (!this.selectionIds || !this.selectionIds.length)
                    ? this.deductions.map(d => d.id)
                    : this.selectionIds;
                this.nbSelected = this.nbCurrentlySelected();
            });
    }

    private _fetchDeductions() {
        let language = this.languageService.getLanguage();
        return this.deductionService.getDeductionGroups(this.withSupplier)
            .map((deductions: Array<Deduction>) =>
                this.deductions = (deductions || []).map(deduction => ({
                    ...deduction,
                    label: language === 'fr' ? deduction.frenchLabel : deduction.englishLabel
                }))
            );
    }

    showDeduction() {
        this.deductionVisible = !this.deductionVisible;
    }

    onOutsideClick($event) {
        if (!this._eref.nativeElement.contains(event.target)) {
            this.deductionVisible = false;
        }
    }

    ngOnChanges(changes) {
        if (changes && changes.selectionIds) {
            this.nbSelected = this.nbCurrentlySelected();
        }
    }

    onDeductionChange($event, deduction: Deduction) {
        this.selectionIds = $event.target.checked
            ? [...this.selectionIds, deduction.id]
            : this.selectionIds.filter(id => id !== deduction.id);
    }

    isSelected(deduction: Deduction): boolean {
        return this.selectionIds.includes(deduction.id);
    }

    selectAll($event) {
        this.selectionIds = $event.target.checked ? this.deductions.map(d => d.id) : [];
    }

    isAll(): boolean {
        return this.nbCurrentlySelected() === this.deductions.length;
    }

    nbCurrentlySelected(): number {
        return this.deductions ?
            this.deductions.filter(d => this.selectionIds.includes(d.id)).length
            : 0;
    }

    submit() {
        this.nbSelected = this.nbCurrentlySelected();
        let selection: Array<Deduction> = this.deductions.filter(d => this.selectionIds.includes(d.id));
        if (selection.length === 0) {
            selection = this.deductions;
        }
        this.onSubmit.emit(selection);
        this.deductionVisible = false;
    }
}
