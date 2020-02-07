import { MOCK_CONSTANTS } from './../../../../mocks.constants';
import { ConfigService } from './../../../../shared/services/config/config.service';
import { RestService } from './../../../../shared/services/network/rest.service';
import { Deduction } from './deduction.service';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';

type DeductionIdType = number;

export interface Deduction {
    id: DeductionIdType;
    frenchLabel: string;
    englishLabel: string;
    label: string;
    priorityOrder: number;
    widthSupplier: boolean;
    selected?: boolean;
}

export type DeductionsIdsSelection = [Array<DeductionIdType>, Array<DeductionIdType>];

@Injectable()
export class DeductionService {

    private deductions: [Array<Deduction>, Array<Deduction>];
    private _selected: DeductionsIdsSelection = [new Array<DeductionIdType>(), new Array<DeductionIdType>()];

    constructor(private restService: RestService, private config: ConfigService) { }

    public getDeductionGroups(withSupplier: boolean): Observable<Array<Deduction>> {
        if (this.config.get('mocked') === true) {
            return Observable.of(JSON.parse(MOCK_CONSTANTS.getDeductionGroups[+withSupplier]));
        }
        let url = `/v1/deductionIndicatorGroups?withSupplierCode=${withSupplier}`;
        return this.restService.get(url)
            .map((deductions: Array<Deduction>) => deductions.map(deduction => ({
                ...deduction,
                label: deduction.frenchLabel
            })));
    }

    setSelectedDeductionsIds(selected: Array<DeductionIdType>, withSupplier: boolean) {
        this._selected[+withSupplier] = selected;
    }

    public resetSelectedDeductionsIds() {
        this._selected = [new Array<DeductionIdType>(), new Array<DeductionIdType>()];
    }

    getSelectedDeductionsIds(): DeductionsIdsSelection {
        return this._selected;
    }
}
