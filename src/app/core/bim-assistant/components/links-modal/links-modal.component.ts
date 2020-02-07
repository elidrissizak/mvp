import { LINKS_MODAL_PARAMS } from './../suggestions/suggestions.component';
import { LinksService } from './../../services/links.service';
import { BsModalRef } from 'ngx-bootstrap';
import {Component, EventEmitter, Output} from '@angular/core';
import { TaskService } from '../../../../shared/services/task/task.service';
import { SessionService } from '../../../../shared/services/session/session.service';
import { HistoryService, HISTORY_ACTION, HistoryAction } from '../../services/history.service';
import { TranslateService } from '@ngx-translate/core';
import { Deduction } from './../../../shared/services/deduction/deduction.service';
import {Router} from "@angular/router";
import {ClusterFilter} from "../../../shared/models/cluster-filter.interface";
import {DrgFilters} from "../../../shared/models/drg-filters.interface";
import {DrgsRepartitionService} from "../../../shared/services/drgs-repartition.service";
import {forEach} from "@angular/router/src/utils/collection";

@Component({
    selector: 'links-modal',
    templateUrl: 'links-modal.component.html',
    styleUrls: ['links-modal.component.scss']
})

export class LinksModalComponent {

    public confirmTreat = false;
    public history : any;
    public nbrLink : number;
    public  links:Array<number>;

    constructor( private translate: TranslateService, private historyService: HistoryService, public bsModalRef: BsModalRef, private router: Router, private linksService : LinksService) {
            this.getHistory();
      this.nbrLink = ['nitgIds', 'projectIds', 'indexIds', 'factoryIds'].filter(e=> historyService[e]!== undefined)
      .map(e=> historyService[e]).reduce(function(prev, current) {
          return (prev.length > current.length) ? prev.length : current.length
        });
      this.links = new Array<number>(this.nbrLink)
    }

    treat() {
        this.confirmTreat = true;
    }

    confirm() {
        this.confirmTreat = false;
        this.bsModalRef.content.confirm = true;
        this.bsModalRef.hide();
        this.removePackets();
        this.router.navigate(['/core/dashboard']);
    }

    cancel() {
        this.confirmTreat = false;
        this.bsModalRef.hide();
    }
    public getHistory() {
        console.log("getting history from link modal", this.historyService.getHistory());
       this.history = this.historyService.getHistory();
    }
    public getHistoryGroupbyLabel(h: HistoryAction) {
        return this.translate.instant('BA.HISTORY.' + h.drgView.groupby.label);
    }
    public getHistoryFilterValue(index: number) {
        // return this.historyValueLabel(this.historyService.getHistory()[index])
        let history = this.historyService.getHistory();
        if (history.length > index + 1) {
            return this.historyValueLabel(history[index + 1])
        }
        return '';
    }

  public getNitgCodes(index: number) {
    if (this.historyService['nitgIdsCodes'] !== undefined) {
      if (this.historyService['nitgIdsCodes'].length == this.nbrLink) {
          return this.historyService['nitgIdsCodes'][index];
      } else {
        return this.historyService['nitgIdsCodes'][0];
      }
    }
    return 'NAN';
  }

  public getIndexCodes(index: number) {
    if (this.historyService['indexIdsCodes'] !== undefined) {
      if (this.historyService['indexIdsCodes'].length == this.nbrLink) {
        return this.historyService['indexIdsCodes'][index];
      } else {
        return this.historyService['indexIdsCodes'][0];
      }
    }
    return 'NAN';
  }

  public getProjectCodes(index: number) {
    if (this.historyService['projectIdsCodes'] !== undefined) {
      if (this.historyService['projectIdsCodes'].length == this.nbrLink) {
        return this.historyService['projectIdsCodes'][index];
      } else {
        return this.historyService['projectIdsCodes'][0];
      }
    }
    return 'NAN';
  }

  public getFactoryCodes(index: number) {
    if (this.historyService['factoryIdsCodes'] !== undefined) {
      if (this.historyService['factoryIdsCodes'].length == this.nbrLink) {
        return this.historyService['factoryIdsCodes'][index];
      } else {
        return this.historyService['factoryIdsCodes'][0];
      }
    }
    return 'NAN';
  }

    public historyValueLabel(h: HistoryAction) {
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

            case HISTORY_ACTION.CODES:
                return h.param.map((code: Deduction) => code.label).join(' + ');

            default:
                return '';
        }
    }
    _packetLabel(rawDatum) {
        return `${rawDatum.code ? rawDatum.code : ''} ${rawDatum.label ? rawDatum.label : ''}`;
    }

  private removePackets() {

      let username = localStorage.getItem('username');
      this.linksService.treat(username, this.historyService.drgFilters).subscribe();

  }


}
