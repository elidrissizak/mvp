import { DrgFilters } from './../../shared/models/drg-filters.interface';
import { DrgsRepartitionService } from './../../shared/services/drgs-repartition.service';
import { AmountPipe } from './../../shared/pipes/amount.pipe';
import { SessionService } from './../../../shared/services/session/session.service';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { TreemapDatum } from '../../shared/components/treemap/treemap.component';

export enum STATE {
    NEUTRAL,
    HIGHLIGHTED,
    SELECTED
};

export interface DrgsTreemapDatum extends TreemapDatum {
    state: STATE;
}

type DrgsTreemapData = Array<DrgsTreemapDatum>;

@Injectable()
export class FetchDrgsService {

    constructor(
        private sessionService: SessionService,
        private drgsRepartitionService: DrgsRepartitionService,
        private amountPipe: AmountPipe) { }

    public fetch(drgFilters: DrgFilters, groupByApiName: string): Observable<Array<DrgsTreemapData>> {
        return Observable.forkJoin(
            [0, 1].map(withSupplier => this.drgsRepartitionService.getByFilter(
                this.sessionService.getLoggedUser().username,
                groupByApiName,
                { ...drgFilters, withSupplier: withSupplier === 1 })
                .map(rawData => this._convertRawDataToTreemapData(rawData)))
        );

    }

    private _convertRawDataToTreemapData(rawData): Array<DrgsTreemapDatum> {
        let id = ((new Date()).getTime()).toString();
        return (rawData || [])
            .filter(rawDatum => rawDatum.id)
            .map((rawDatum): DrgsTreemapDatum => {
                return {
                    rawDatum,
                    id: id + rawDatum.id.toString(),
                    label: `${rawDatum.code ? rawDatum.code.split(' - ').join("\n") : ' '}
                        ${rawDatum.label || ''}
                        ${this.amountPipe.transform(rawDatum.value)} €`,
                    value: rawDatum.value,
                    children: [],
                    state: STATE.NEUTRAL,
                    backgroundColor: undefined,
                    textColor: undefined,
                    bold: rawDatum.countSupplier === 1 && rawDatum.supplierId !== undefined
                }
            });
    }
}
