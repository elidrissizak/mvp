import { Deduction } from './../../../shared/services/deduction/deduction.service';
import { TranslateService } from '@ngx-translate/core';
import { Component, Input, EventEmitter, Output } from '@angular/core';
import { HistoryService, HISTORY_ACTION, HistoryAction } from '../../services/history.service';

import { Subscription } from 'rxjs/Subscription';
import { DataService } from '../../services/data.service';

@Component({
    selector: 'ba-breadcrumbs',
    templateUrl: 'breadcrumbs.component.html',
    styleUrls: ['breadcrumbs.component.scss']
})
export class BreadcrumbsComponent {

    @Input('selected-packet') selectedPacket;
    @Output('apply') applyEvent = new EventEmitter();
    subscription: Subscription;
    selectedCluster : any;
    constructor(
        private historyService: HistoryService,private _dataService: DataService,
        private translate: TranslateService) {

            this.subscription = this._dataService.getUser().subscribe(selectedCluster => { this.selectedCluster = selectedCluster; });
         }

    public applyHistory(historyIndex) {
        this.historyService.resetTo(historyIndex);
        this.applyEvent.emit({ history: this.historyService.getHistory(), historyIndex });
        
    }

    public getHistory() {
        return this.historyService.getHistory();
    }

    public getHistoryGroupbyLabel(h: HistoryAction) {
        return this.translate.instant('BA.HISTORY.' + h.drgView.groupby.label);
    }

    public getHistoryFilterValue(index: number) {
        // return this.historyValueLabel(this.historyService.getHistory()[index])
        let history = this.historyService.getHistory();
        if (history.length > index + 1) {
            return this.historyValueLabel(history[index + 1] , index)
        }
        return this.getLastPacketSelectedValue();
    }

    getLastPacketSelectedValue() {
        return this.selectedPacket ? this._packetLabel(this.selectedPacket) : '';
    }

    _packetLabel(rawDatum) {
        return `${rawDatum.code ? rawDatum.code : ''} ${rawDatum.label ? rawDatum.label : ''}`;
    }

    // TODO : this is wrong, all this code should in pipes
    public historyValueLabel(h: HistoryAction , index: number) {
       /* let history = this.historyService.getHistory();
        if (history.length > index + 1) {
            console.log("case 1 => ");
        }else
        console.log("case 2 => ");

        if(h.action == HISTORY_ACTION.PERIOD){
            console.log("case 2 => ");
        }*/
        switch (h.action) {
            // case HISTORY_ACTION.PACKET:
            //     return this._packetLabel(h.param);

            case HISTORY_ACTION.GROUPBY:
                return this._packetLabel(h.param);

            case HISTORY_ACTION.PERIOD:
                const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
                const startMonthStr = this.translate.instant(`BA.DATE_${months[h.param.startDate.getMonth()]}_MONTH`);
                const endMonthStr = this.translate.instant(`BA.DATE_${months[h.param.endDate.getMonth()]}_MONTH`);
                return `${startMonthStr} ${h.param.startDate.getFullYear()} - ${endMonthStr} ${h.param.endDate.getFullYear()}`;
              //  return this.applyHistory(index);
            case HISTORY_ACTION.CODES:
                return h.param.map((code: Deduction) => code.label).join(' + ');

            default:
                return '';
        }
    }
}
