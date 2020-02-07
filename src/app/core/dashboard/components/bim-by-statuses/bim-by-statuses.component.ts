import { TaskService } from './../../../../shared/services/task/task.service';
import { PacketDrgBySupplierDeductionTypeResource } from './../../../shared/models/packet-drg-resource.interface';
import { ColorService } from './../../../shared/services/color.service';
import { SessionService } from './../../../../shared/services/session/session.service';
import { DrgsRepartitionService } from './../../../shared/services/drgs-repartition.service';
import { BimDataConverter, BimDatum } from './../../services/bim-data-converter.service';
import { TranslateService } from '@ngx-translate/core';
import { Component } from '@angular/core';
import { PieDatum } from '../../../shared/components/pie/pie.component';

/**
 * This is the first pie on the left.  
 * Statuses are : FAC, BLO, REC, BIM, HPE, EPU, SUP, etc.  
 * 
 */
@Component({
    selector: 'bim-status',
    templateUrl: 'bim-by-statuses.component.html',
    styleUrls: ['bim-by-statuses.component.scss']
})
export class BimByStatusesComponent {

    public unit = 'percent';
    private data: Array<BimDatum> = [];
    public statusNamesList: Array<string>;
    public currentData: Array<PieDatum>;

    constructor(
        private taskService: TaskService,
        private drgsRepartitionService: DrgsRepartitionService,
        private sessionService: SessionService,
        private bimDataConverter: BimDataConverter,
        private colorService: ColorService,
        private translate: TranslateService) { }

    ngOnInit() {
        let login = this.sessionService.getLoggedUser().username;
        this.taskService.do(
            this.drgsRepartitionService.getByStatuses(login),
            this.translate.instant('TASKS.CLAIMS_BY_STATUSES')
        ).subscribe(
            (data: Array<PacketDrgBySupplierDeductionTypeResource>) => {
                data = data || [];
                // API gives an order for the statuses.
                // So let's use it !
                data.sort((a, b) => a.priorityOrder - b.priorityOrder);
                this.statusNamesList = data.map(datum => datum.status);
                this.data = this.bimDataConverter.convert(data, d => d.status, d => d.status, d => d.status)
                this.onUnitChange('percent');
            });
    }

    onUnitChange(unit?: string) {
        this.unit = unit || this.unit;
        this.currentData = this.bimDataConverter.generatePieData(this.data, this.unit);
    }
}
