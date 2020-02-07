import { DrgsRepartitionService } from './../shared/services/drgs-repartition.service';
import { LanguageService } from './../../shared/services/language/language.service';
import { FetchDrgsService, DrgsTreemapDatum } from './services/fetch-drgs.service';
import { DrgGroupby } from './../shared/models/drg-groupby.interface';
import { DrgView } from './../shared/models/drg-view.interface';
import { PacketExporterComponent } from './components/packet-exporter/packet-exporter.component';
import { Deduction, DeductionService } from './../shared/services/deduction/deduction.service';
import * as FileSaver from "file-saver";
import { DateToMysqlDatePipe } from './../shared/pipes/date-to-mysql-date.pipe';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { DeductionsCodesComponent } from './components/codes-deductions/codes-deductions.component';
import { ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { Period, PeriodService } from './services/period.service';
import { GROUPBYS } from './bim-assistant.constants';
import { CORE_CONSTANTS } from "./../shared/constants/core.constants";
import { TreemapDatum } from "./../shared/components/treemap/treemap.component";
import { TranslateService } from "@ngx-translate/core";
import { Observable, Subject } from "rxjs/Rx";
import { TaskService } from "./../../shared/services/task/task.service";
import { SessionService } from "./../../shared/services/session/session.service";
import { Component, ViewChild } from "@angular/core";
import { HistoryService, HISTORY_ACTION, HistoryAction } from './services/history.service';
import { DrgsTreemapComponent } from './components/drgs-treemap/drgs-treemap.component';
import { DataService } from "./services/data.service";
import { groupBy } from 'rxjs/operator/groupBy';

/**
 * This is the main Bim Assistant screen.
 * It contains the treemaps, breadcrumbs, groupby bar, suggestions, etc.
 * **BEWARE** : the code is half done for multiple packets selection.
 * Right now we put only one packet in this.selectedPackets.
 */
@Component({
    selector: 'bim-assistant',
    templateUrl: 'bim-assistant.component.html',
    styleUrls: ['bim-assistant.component.scss'],
})
export class BimAssistantComponent {
    public drgView : DrgView;
    public treemapData = [
        new Array<DrgsTreemapDatum>(), // withoutSupplier
        new Array<DrgsTreemapDatum>() // withSupplier
    ];
    public TREEMAP_COLORS = CORE_CONSTANTS.TREEMAP_COLORS;
    public selectedDeductionsIds = [
        new Array<number>(), // withoutSupplier
        new Array<number>() // withSupplier
    ];
    public prevSelectedPackets: Array<DrgsTreemapDatum> = undefined;
    public selectedGroupbys = new Array<DrgGroupby>();
    public disabledGroupbyNames = [
        new Array<string>(),
        new Array<string>()
    ];

    @ViewChild('withSupplier') withSupplier: DrgsTreemapComponent;
    @ViewChild('withoutSupplier') withoutSupplier: DrgsTreemapComponent;
    public activePanel: DrgsTreemapComponent;

    @ViewChild('packetExporter') packetExporter: PacketExporterComponent;

    constructor(
        private taskService: TaskService,
        private session: SessionService,
        private deductionService: DeductionService,
        private translate: TranslateService,
        private fetchDrgsService: FetchDrgsService,
        private historyService: HistoryService,
        private periodService: PeriodService,
        private languageService: LanguageService,
        private drgsRepartitionService: DrgsRepartitionService,
        private dateToMysqlDatePipe: DateToMysqlDatePipe,
        private modalService: BsModalService,
        private _dataService: DataService) { 
            this._dataService.sendSupplier(false);
        }

    ngOnInit() {
        // For now : every time we enter and re-enter the bim assistant
        // we reset the whole history
        this.historyService.reset();
        
        // Start point : group by GSFA, 5 years
        this.drgView = {
            groupby: GROUPBYS.gsfa,
            filters: {
                withSupplier: false,
                period: this.periodService.createPeriod(5)
            },
            selectedPackets: undefined
        };
        // Get deductions
        this._getDeductions()
            .subscribe((selectedDeductionsIds: Array<number[]>) => {
                this.selectedDeductionsIds = selectedDeductionsIds;
                // we reset the selection
                this.deductionService.resetSelectedDeductionsIds();
                // drgView.filters.deductionIndGroup is a flat list
                this.drgView.filters.deductionIndGroup = [
                    ...this.selectedDeductionsIds[0],
                    ...this.selectedDeductionsIds[1]
                ];
                this._updateAndSaveHistory(HISTORY_ACTION.GROUPBY);
            });
    }

    /**
     * Load deductions from server, and select the ones previously
     * selected in the Admin section (if any).
     */
    private _getDeductions(): Observable<Array<number[]>> {
        // Deductions : first we got them all
        return Observable.forkJoin([0, 1].map(
            withSupplier => this.deductionService.getDeductionGroups(withSupplier === 1)))
            // forkJoin done : we got deductions codes with and without supplier.
            .map((deductions: [Array<Deduction>, Array<Deduction>]) => {
                // Default : all deductions are selected
                const selectedDeductionsIds = [deductions[0].map(d => d.id), deductions[1].map(d => d.id)];
                // But if some have been selected from the dashboard...
                const alreadySelected = this.deductionService.getSelectedDeductionsIds();
                if (alreadySelected && alreadySelected[0].length > 0) {
                    selectedDeductionsIds[0] = alreadySelected[0];
                }
                if (alreadySelected && alreadySelected[1].length > 0) {
                    selectedDeductionsIds[1] = alreadySelected[1];
                }
                return selectedDeductionsIds;
            });
    }

    onPacketMouseOver(panel, packet: DrgsTreemapDatum) {
        this.otherPanel(panel).lightOnPacket(packet);
    }

    onPacketMouseOut(panel, packet: DrgsTreemapDatum) {
        this.otherPanel(panel).lightOffPacket(packet);
    }

    onSelectPacketByClick(panel, packet: DrgsTreemapDatum) {
        this.activePanel = panel;
        this.otherPanel(panel).selectPacket(packet);
        this.selectPacket(packet);
    }

    selectPacket(packet: DrgsTreemapDatum) {
        this.prevSelectedPackets = this.prevSelectedPackets || [];
        this.drgView.selectedPackets = this.drgView.selectedPackets || [];
        if (this.drgView.selectedPackets.length>0) {
          this.prevSelectedPackets.push(this.drgView.selectedPackets[this.drgView.selectedPackets.length-1]);
        }
        this.drgView.selectedPackets.push(packet);
      this.publish();
    }

    onUnselectPacketByClick(panel, packet: DrgsTreemapDatum) {
      this.drgView.selectedPackets = this.drgView.selectedPackets || [];
      this.prevSelectedPackets = this.prevSelectedPackets || [];
      this.prevSelectedPackets = this.prevSelectedPackets.filter(p => p.id !== packet.id) || [];
      this.drgView.selectedPackets = this.drgView.selectedPackets.filter(p => p.id !== packet.id) || [];
      this.otherPanel(panel).selectPacket(packet);
      this.publish();
    }

    private publish(){
      // Say we are displaying the treemap with packets grouped by GSFA.
      // A packet has been selected. We will have to add its id
      // to drgView.filters.gsfaIds (see drg-filters.interface.ts)
      // We do it by using the groupby selectionPropName attribute.
      var selectionPropName = this.drgView.groupby.selectionPropName;

      if (this.historyService.drgFilters == undefined) {
        this.historyService.drgFilters = this.drgView.filters;
      }
      this.historyService.drgFilters[selectionPropName] = this.drgView.selectedPackets !== undefined
        // We send multiple packets but in fact there is only one
        ? this.drgView.selectedPackets.map(d => d.rawDatum.id)
        : undefined;

      this.historyService[selectionPropName] = this.drgView.selectedPackets !== undefined
        // We send multiple packets but in fact there is only one
        ? this.drgView.selectedPackets.map(d => d.rawDatum.id)
        : undefined;

      if (selectionPropName.endsWith('ProjectIds')) {
        selectionPropName = 'projectIds';
      }

      if (selectionPropName.endsWith('IndexIds')) {
        selectionPropName = 'indexIds';
      }

      if (selectionPropName.endsWith('FactoryIds')) {
        selectionPropName = 'factoryIds';
      }

      this.historyService[selectionPropName] = this.drgView.selectedPackets !== undefined
        // We send multiple packets but in fact there is only one
        ? this.drgView.selectedPackets.map(d => d.rawDatum.id)
        : undefined;

      this.historyService[selectionPropName+'Codes'] = this.drgView.selectedPackets !== undefined
        // We send multiple packets but in fact there is only one
        ? this.drgView.selectedPackets.map(d => d.rawDatum.code)
        : undefined;

      selectionPropName = this.drgView.groupby.selectionPropName;

      this.drgView.filters[selectionPropName] =
        this.drgView.selectedPackets !== undefined
          // We send multiple packets but in fact there is only one
          ? this.drgView.selectedPackets.map(d => d.rawDatum.id)
          : undefined;
    }

    private otherPanel(panel: DrgsTreemapComponent): DrgsTreemapComponent {
        return panel === this.withSupplier ? this.withoutSupplier : this.withSupplier;
    }

    onDeductionsCodesSubmit(panel: DrgsTreemapComponent, deductionsCodes: Array<Deduction>) {
        this.selectedDeductionsIds[+(panel === this.withSupplier)] = deductionsCodes.map(d => d.id);
        this.drgView.filters.deductionIndGroup = [
            ...this.selectedDeductionsIds[0],
            ...this.selectedDeductionsIds[1]
        ];
        this._updateAndSaveHistory(HISTORY_ACTION.CODES, [...deductionsCodes]);
    }

    onGroupbyClick(groupby: DrgGroupby) {
        let enableButton = false;
        if(groupby.name == "supplier"){
            enableButton = true;
        }else{
            for (let history of this.historyService.history) {
                if(history.drgView.groupby.name == "supplier"){
                    enableButton = true;
                }
               
            }
        }
        this._dataService.sendSupplier(enableButton);
       
        this.drgView.groupby = groupby;
        const rawDatum = this.drgView.selectedPackets[0].rawDatum;
        this._updateAndSaveHistory(HISTORY_ACTION.GROUPBY, rawDatum);
        this.prevSelectedPackets = this.drgView.selectedPackets;
        this.drgView.selectedPackets = undefined;
    }

    onPeriodSubmit(panel: DrgsTreemapComponent, period: Period) {
        this.activePanel = panel;
        this.drgView.filters.period = { ...period };
        this._updateAndSaveHistory(HISTORY_ACTION.PERIOD, { ...this.drgView.filters.period });
    }

    private _updateAndSaveHistory(action: HISTORY_ACTION, param: any = undefined) {
       // console.log("=> push ", action , " param", param);
        if(action == HISTORY_ACTION.PERIOD){
            console.log("date => ");
        }else{
            this.historyService.pushHistory(action, param, this.drgView);
            this.update();
        }
       
    }

    public applyHistory({ history, historyIndex }: { history: Array<HistoryAction>, historyIndex: number }) {
       // console.log("=> history ", history);
        this.drgView = {
            ...history[historyIndex].drgView,
            selectedPackets: []
        };
        this.selectedGroupbys = history
            .filter(h => h.action === HISTORY_ACTION.GROUPBY)
            .map(h => h.drgView.groupby);
        this.update();
    }

    public update(selectedPacket = undefined) {
        this.taskService.do(
            this.fetchDrgsService
                .fetch(this.drgView.filters, this.drgView.groupby.api)
                .map(data => this.treemapData = data), this.translate.instant('TASKS.FETCH_CLAIMS_AND_META'))
            .subscribe();
    }

    public showExportPacketModal(tmDatum: DrgsTreemapDatum, withSupplier: boolean) {
        this.packetExporter.showModal({ tmDatum, drgView: this.drgView, withSupplier });
    }
}
