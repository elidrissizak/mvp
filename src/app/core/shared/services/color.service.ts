import { Injectable } from '@angular/core';

@Injectable()
export class ColorService {

    private hardcoded = {
        'BLO': '#346823',
        'REC': '#CEAC01',
        'BIM': '#2C97DE',
        'HPE': '#981E7B',
        'EPU': '#DD8100',
        'SUP': '#cccccc',
        'FAC': '#B7D334',

        'WITH_SUPPLIER_DEDUCTION_CODE': '#2C97DE',
        'WITHOUT_SUPPLIER_DEDUCTION_CODE': '#C23824',

        'deduction6': '#80F0FF',
        'deduction5': '#01354D',
        'deduction1': '#0272A6',
        'deduction8': '#01ADCB',

        'deduction7': '#880E4F',
        'deduction2': '#F79A84',
        'deduction3': '#FF80AB',
        'deduction4': '#A61646',
    }

    private palette = [
        '#94a5a6',
        '#2c97de',
        '#c23824',
        '#1ebea5',
        '#785549',
        '#346823',
        '#b7d334',
        '#6744b1',
        '#FBD474',
        '#5C7ABB'
    ];
    private paletteIndex = 0;
    private colors = [];

    get(key) {
        if (this.hardcoded[key] !== undefined) {
            return this.hardcoded[key];
        }
        if (this.colors[key] === undefined) {
            this.colors[key] = this.palette[this.paletteIndex++];
            this.paletteIndex =
                this.paletteIndex === this.palette.length ? 0 : this.paletteIndex;
        }
        //console.log('asked: ', key, 'given:', this.colors[key]);
        return this.colors[key];
    }
}
