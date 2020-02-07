import { BimDataConverter } from './../../services/bim-data-converter.service';
import { ColorService } from './../../../shared/services/color.service';
import { DrgsRepartitionService } from './../../../shared/services/drgs-repartition.service';
import { TaskService } from './../../../../shared/services/task/task.service';
import { Router } from '@angular/router';
import { PieDatum } from './../../../shared/components/pie/pie.component';
import { TranslateService } from '@ngx-translate/core';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { SessionService } from '../../../../shared/services/session/session.service';

/**
 * The BimTabComponent displays a pie chart showing the 
 * DRGs distribution between with and without supplier.
 */
@Component({
    selector: 'bim-tab',
    templateUrl: 'bim-tab.component.html',
    styleUrls: ['bim-tab.component.scss'],
})
export class BimTabComponent {

    public unit = 'percent';
    public data = [];
    public currentData: Array<any>;

    constructor(
        private taskService: TaskService,
        private drgsRepartitionService: DrgsRepartitionService,
        private sessionService: SessionService,
        public colorService: ColorService,
        private translate: TranslateService,
        private bimDataConverter: BimDataConverter,
        private router: Router) { }

    ngOnInit() {
        let login = this.sessionService.getLoggedUser().username;
        this.taskService.do(
            this.drgsRepartitionService.getBim(login),
            this.translate.instant('TASKS.FETCH_CLAIMS')
        ).subscribe(data => {
            data = data || []; // defensive programming
            this.data = this.bimDataConverter.convert(
                data,
                d => d.supplierDeductionType,
                d => d.supplierDeductionType,
                d => d.supplierDeductionType);
            // Force the percent display at init
            this.onUnitChange('percent');
        });
    }

    onUnitChange(unit?) {
        this.unit = unit || this.unit;
        this.currentData = this.bimDataConverter.generatePieData(this.data, this.unit);
    }

    goToBimAssistant() {
        this.router.navigate(['/core/bim-assistant']);
    }

}
