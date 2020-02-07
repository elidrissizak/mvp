import { ColorService } from './../../shared/services/color.service';
import { AmountPipe } from './../../shared/pipes/amount.pipe';
import { PieDatum } from './../../shared/components/pie/pie.component';
import { Injectable } from '@angular/core';

/**
 * DistributionDatum is what is expected from an API datum.  
 * It gives for given type of DRGs : 
 *  * the number of DRGs (count)
 *  * the value of theses DRGs (value)
 */
export interface DistributionDatum {
    value: number;
    count: number;
}

export interface BimDatum {
    id: string;
    colorId: string;
    count: {
        value: number,
        label: string
    },
    amount: {
        value: number,
        label: string
    },
    percent: {
        value: number,
        label: string
    },
    bold?: boolean
}

/**
 * This service will convert api data to the app format (BimData).
 * The first method `convert` raw data from the API to BimData.
 * The BimData format store the three units values : percent, amount and count.  
 * From this format, one can use any other method to generate charts. 
 * Actually there is only pie chart : `generatePieData`
 */
@Injectable()
export class BimDataConverter {

    constructor(private amountPipe: AmountPipe, private colorService: ColorService) { }

    /**
     * For a given array of "raw" data (from the API), will return a BimData array.  
     * 
     * @param data raw data
     * @param idGenerator function applied to each datum, must return an id as a string
     * @param labelGenerator function applied to each datum, must return a label as a string
     * @param colorIdGenerator function applied to each datum, must return a color id a string
     */
    convert(
        data: Array<DistributionDatum>,
        idGenerator: (any) => string,
        labelGenerator: (any) => string,
        colorIdGenerator: (any) => string): Array<BimDatum> {

        data = data || [];
        // Even if sometimes the API gives us the percentage, we compute it
        // by ourselve. Why ? Don't remember. Because of a bug in the back
        // I think.
        let amountTotal = data.reduce((prev, cur) => prev += cur.value, 0);

        return data.map((datum: DistributionDatum) => {
            let datumTypeLabel = labelGenerator(datum);
            return {
                id: idGenerator(datum),
                colorId: colorIdGenerator(datum),
                count: {
                    value: datum.count,
                    label: `${this.amountPipe.transform(datum.count.toString())}\n${datumTypeLabel}`
                },
                amount: {
                    value: datum.value,
                    label: `${this.amountPipe.transform(datum.value.toString())} €\n${datumTypeLabel}`
                },
                percent: {
                    value: datum.value / amountTotal * 100,
                    label: `${(datum.value / amountTotal * 100).toFixed(2)} %\n${datumTypeLabel}`
                }
            };
        });
    }

    /**
     * Convert BimData to PieDatum following the unit.
     * @param data 
     * @param unit 'percent' | 'amount' | 'count'
     */
    generatePieData(data: Array<BimDatum>, unit: string): Array<PieDatum> {
        return data.map(d => ({
            id: d.id,
            value: d[unit].value,
            label: d[unit].label,
            bold: d.bold,
            color: this.colorService.get(d.colorId)
        }));
    }
}


