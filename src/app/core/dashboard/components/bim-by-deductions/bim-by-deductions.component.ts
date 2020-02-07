import { Deduction, DeductionService } from './../../../shared/services/deduction/deduction.service';
import { LanguageService } from "./../../../../shared/services/language/language.service";
import { ColorService } from "./../../../shared/services/color.service";
import { BimDataConverter, BimDatum } from "./../../services/bim-data-converter.service";
import { DrgsRepartitionService } from "./../../../shared/services/drgs-repartition.service";
import { TaskService } from "./../../../../shared/services/task/task.service";
import { Router } from "@angular/router";
import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { SessionService } from '../../../../shared/services/session/session.service';

/**
 * BimByDeductionsComponent is used for the last two pies on the
 * right of the dashboard.  
 * The deductions displayed are the ones present in the pie. Those which
 * are not in the distribution data are not displayed.  
 * 
 */
@Component({
    selector: 'bim-by-deductions',
    templateUrl: 'bim-by-deductions.component.html',
    styleUrls: ['bim-by-deductions.component.scss'],
})
export class BimByDeductionsComponent {
    @Input('with-supplier') withSupplier = false;
    public unit = 'percent';
    public distribution: Array<BimDatum> = [];
    public currentDistribution: Array<any>;
    public deductions: Array<Deduction>;

    constructor(
        private taskService: TaskService,
        private drgsRepartitionService: DrgsRepartitionService,
        private sessionService: SessionService,
        private bimDataConverter: BimDataConverter,
        private colorService: ColorService,
        private deductionService: DeductionService,
        private languageService: LanguageService,
        private router: Router) { }

    ngOnInit() {
        // In case of language switching, we want to get the deductions labels
        this.languageService.onLanguageSwitch().subscribe(() => this.deductions = [...this.deductions]);
        // First we get all the deductions codes
        let language = this.languageService.getLanguage();
        this.deductionService.getDeductionGroups(this.withSupplier)
            .map((deductions: Array<Deduction>) =>
                this.deductions = (deductions || []).map(deduction => ({
                    ...deduction,
                    color: this.colorService.get('deduction' + deduction.id),
                    label: language === 'fr' ? deduction.frenchLabel : deduction.englishLabel,
                    selected: false
                })))
            // Then we get the DRGs
            .flatMap(() => this.drgsRepartitionService.getByDeductions(this.sessionService.getLoggedUser().username, this.withSupplier))
            // Convert distribution to dashboard format
            .map(distribution => {
                this.distribution = this.bimDataConverter.convert(
                    distribution || [],
                    // Beware here : we use BimDatum.id to know the deduction supplier id
                    d => d.idSupplierDeduction,
                    d => this.deductions.find(deduction => deduction.id === d.idSupplierDeduction).label,
                    d => 'deduction' + d.idSupplierDeduction)
                return distribution;
            })
            // Remove deductions not present in the DRG distribution
            .map(distribution => {
                const presentDeductionsIds: number[] = this.distribution.map(d => parseInt(d.id));
                this.deductions.filter(deduction => presentDeductionsIds.includes(deduction.id))
            })
            .subscribe(() => this.onUnitChange('percent'));
    }

    onUnitChange(unit?) {
        this.unit = unit || this.unit;
        this.currentDistribution = this.bimDataConverter.generatePieData(this.distribution, this.unit);
    }

    private _update(bolder) {
        // Get new distribution where each datum will be bolded (or not)
        // by the bolder function.
        this.distribution = this.distribution.map(datum => ({ ...datum, bold: bolder(datum) }));
        // Update deductions selection
        this.setSelection();
        // Trigger pie update
        this.onUnitChange();
    }

    /**
     * Called when the user click on a deduction checkbox.  
     * The check is managed by Angular with the [checked] attribute,
     * but the pie bolding is done by _update.
     * @param deduction 
     */
    switchByCheckbox($event, deduction: Deduction) {
        deduction.selected = !deduction.selected;
        this._update(datum => datum.id === deduction.id ? $event.target.checked : datum.bold);
    }

    /**
     * Called when the user click on a slice.
     * @param event 
     */
    switchByClick(event) {
        this._update(datum => datum.id === event.data.id ? !datum.bold : datum.bold);
        const deduction = this.deductions.find(d => d.id === event.data.id);
        deduction.selected = !deduction.selected;
    }

    switchAll($event) {
        this._update(datum => $event.target.checked);
    }

    setSelection() {
        this.deductionService.setSelectedDeductionsIds(
            this.distribution
                .filter(datum => datum.bold)
                .map(datum => parseInt(datum.id)),
            this.withSupplier);
    }

    isSelected(deduction) {
        return this.distribution.find(d => d.id === deduction.id && d.bold);
    }

    isAll() {
        return this.distribution.every(datum => datum.bold);
    }

    nbSelected() {
        return this.distribution.filter(datum => datum.bold).length;
    }

    goToBimAssistant() {
        this.router.navigate(['/core/bim-assistant']);
    }
}


