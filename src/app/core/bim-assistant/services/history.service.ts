import { DrgFilters } from './../../shared/models/drg-filters.interface';
import { Injectable } from '@angular/core';
import { DrgView } from '../../shared/models/drg-view.interface';

export enum HISTORY_ACTION {
    PERIOD,
    CODES,
    PACKET,
    GROUPBY
};

export type HistoryAction = { action: HISTORY_ACTION, param: any, drgView: DrgView };


@Injectable()
export class HistoryService {

    history: Array<HistoryAction> = [];
    drgFilters: DrgFilters;
    supplierId: number;

    private cloneDrgFilters(src: DrgFilters) {
        let dst = { ...src };
        Object.keys(src).forEach(k => {
            if (Array.isArray(src[k])) {
                dst[k] = [...src[k]];
            }
        });
        return dst;
    }

    public pushHistory(action: HISTORY_ACTION, param: any = undefined, drgView: DrgView): void {
        this.history.push({
            action,
            param,
            drgView: {
                filters: this.cloneDrgFilters(drgView.filters),
                groupby: { ...drgView.groupby },
                selectedPackets: drgView.selectedPackets ? [...drgView.selectedPackets] : undefined
            }
        });
    }

    public reset() {
        this.history = [];
    }

    public resetTo(historyIndex: number): void {
        this.history = this.history.slice(0, historyIndex + 1);
    }

    public getHistory(): Array<HistoryAction> {
        return this.history;
    }
}
