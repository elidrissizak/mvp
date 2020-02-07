import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable, Subject } from 'rxjs/Rx';
import { ButtonModalComponent } from './../../../shared/components/button-modal/button-modal.component';
import { DrgFilters } from './../../../shared/models/drg-filters.interface';
import { ClusterFilter } from './../../../shared/models/cluster-filter.interface';
import { Deduction } from './../../../shared/services/deduction/deduction.service';
import { HistoryAction } from './../../services/history.service';
import { ConfigService } from "./../../../../shared/services/config/config.service";
import { TranslateService } from "@ngx-translate/core";
import { DrgsRepartitionService } from "./../../../shared/services/drgs-repartition.service";
import { Component, Input, ViewChild, EventEmitter, Output } from "@angular/core";
import { DrgView } from '../../../shared/models/drg-view.interface';
import { LinksModalComponent } from '../links-modal/links-modal.component';
import {HISTORY_ACTION, HistoryService} from '../../services/history.service';
import { TaskService } from '../../../../shared/services/task/task.service';
import { DrgsTreemapDatum } from '../../services/fetch-drgs.service';
import { DataService } from '../../services/data.service';
import { Subscription } from 'rxjs/Subscription';
export type LINKS_MODAL_PARAMS = {
    suggestions: Array<any>,
    drgView: DrgView
};

export type LINKS_MODAL = {
    component: typeof LinksModalComponent,
    text: string,
    params: LINKS_MODAL_PARAMS,
    successCallback: Function,
    errorCallback: Function,
};

@Component({
    selector: 'suggestions',
    templateUrl: 'suggestions.component.html',
    styleUrls: ['suggestions.component.scss']
})
export class SuggestionsComponent {
    @Input('selected-packet') selectedPacket = undefined as DrgsTreemapDatum;
    @Input('prev-selected-packet') prevSelectedPacket = undefined as DrgsTreemapDatum;
    @Input('drg-view') drgView = undefined as DrgView;
    @Input('reload-trigger') reloadTrigger: Subject<boolean>;
    @Output('modal-closed') modalClosed = new EventEmitter();
    canSuggest: boolean = false;
    subscription: Subscription;
    selectedCluster : any;
    enableButton : any;
    modal: LINKS_MODAL = {
        component: LinksModalComponent,
        text: 'BA.LINKS_MODAL',
        params: {
            suggestions: undefined,
            drgView: undefined
        },
        successCallback: () => {
            // success means treat
            // we have to reload the bim-assistant
            this.modalClosed.emit();
        },
        errorCallback: () => { }
    };

    suggestions = [];

    constructor(
        private taskService: TaskService,
        private config: ConfigService,
        private translate: TranslateService,
        private drgsRepartitionService: DrgsRepartitionService,
        private _dataService: DataService,
        private historyService: HistoryService
    ) {
        this.subscription = this._dataService.getUser().subscribe(selectedCluster => { this.selectedCluster = selectedCluster; });
        this.subscription = this._dataService.ifSupplier().subscribe(enableButton => { this.enableButton = enableButton;console.log("*****",enableButton,"*******"); });
    }

    @ViewChild('buttonModal') buttonModal: ButtonModalComponent;
    ngOnInit() {
        this.config.get('autoDisplayLinksModal') === true && this._fetchSuggestions(0, this.drgView.filters).subscribe(data => {
            this.modal.params.drgView = this.drgView;
            this.suggestions = this.modal.params.suggestions = data || [];
            setTimeout(() => this.buttonModal.openModal(), 500);
        });
    }

    public ngOnChanges(changes) {
        if (changes &&
            (changes.selectedPacket && !changes.selectedPacket.currentValue) &&
            (changes.prevSelectedPacket && changes.prevSelectedPacket.currentValue)
        ) {
            let sp; // sp = selectedPacket
            // if (changes.selectedPacket.currentValue) {
            //     sp = changes.selectedPacket.currentValue.rawDatum;
            // }
            // else {
            // }
          sp = changes.prevSelectedPacket.currentValue.rawDatum;
            this.canSuggest = sp.supplierId && sp.countSupplier === 1;
          //let sp = changes.selectedPacket.currentValue.rawDatum; // sp = selectedPacket
            if (this._canSuggest(sp)) {
              this.historyService['nitgIdsCodes'] = undefined;
              this.historyService['projectIdsCodes'] = undefined;
              this.historyService['indexIdsCodes'] = undefined;
              this.historyService['factoryIdsCodes'] = undefined;
              this.historyService['nitgIds'] = undefined;
              this.historyService['projectIds'] = undefined;
              this.historyService['indexIds'] = undefined;
              this.historyService['factoryIds'] = undefined;
              this.historyService.supplierId = sp.supplierId;
                this.taskService.do(
                    this._fetchSuggestions(sp.supplierId, this.drgView.filters),
                    this.translate.instant('TASKS.SUGGESTIONS')
                ).subscribe(data => {
                    this.suggestions = this.modal.params.suggestions = data || [];
                    this.modal.params.drgView = this.drgView;
                })
            }

        }
    }

    private _canSuggest(sp) {
        // If selected packet has a supplier
        return sp.supplierId &&
            // And only one
            sp.countSupplier === 1
         && this.drgView.filters['nitgIds'] == undefined
          && this.drgView.filters['vehicleProjectIds'] == undefined
          && this.drgView.filters['engineProjectIds'] == undefined
          && this.drgView.filters['gearboxProjectIds'] == undefined
          && this.drgView.filters['vehicleIndexId'] == undefined
          && this.drgView.filters['engineIndexId'] == undefined
          && this.drgView.filters['gearboxIndexId'] == undefined
          && this.drgView.filters['vehicleFactoryId'] == undefined
          && this.drgView.filters['engineFactoryId'] == undefined
          && this.drgView.filters['gearboxFactoryId'] == undefined;

            // // And data have been grouped by nitg or project
            // ['nitgIds', 'vehicleProjectIds', 'engineProjectIds', 'gearboxProjectIds']
            //     .find(e => this.drgView.filters[e] !== undefined && this.drgView.filters[e].length > 0) !== undefined;

    }

    private _fetchSuggestions(supplierId: number, fp: DrgFilters) {
        const _getFirstOf = t => t ? t[0] : undefined;
        let clusterFilter: ClusterFilter = {
            supplierId,
            withDetails: true,
            gsfaId: _getFirstOf(fp.gsfaIds),
            nitgId: _getFirstOf(fp.nitgIds),
            partId: _getFirstOf(fp.partIds),

            vehicleProjectId: _getFirstOf(fp.vehicleProjectIds),
            vehicleIndexId: _getFirstOf(fp.vehicleIndexIds),
            vehicleFactoryId: _getFirstOf(fp.vehicleFactoryIds),

            engineProjectId: _getFirstOf(fp.engineProjectIds),
            engineIndexId: _getFirstOf(fp.engineIndexIds),
            engineFactoryId: _getFirstOf(fp.engineFactoryIds),

            gearboxProjectId: _getFirstOf(fp.gearboxProjectIds),
            gearboxIndexId: _getFirstOf(fp.gearboxIndexIds),
            gearboxFactoryId: _getFirstOf(fp.gearboxFactoryIds),

            groupBy: this.drgView.groupby.api
        };
        return this.drgsRepartitionService.getSuggestions(clusterFilter);
    }
}
