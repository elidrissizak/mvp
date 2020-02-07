import { PacketDrgBySupplierDeductionTypeResource } from './../../shared/models/packet-drg-resource.interface';
import { ColorService } from './../../shared/services/color.service';
import { CurrencyPipe } from '@angular/common';
import { AmountPipe } from './../../shared/pipes/amount.pipe';
import { PieDatum } from './../../shared/components/pie/pie.component';
import { TranslateService } from '@ngx-translate/core';
import { BimDataConverter, BimDatum } from './bim-data-converter.service';
import { TestBed, async, getTestBed } from '@angular/core/testing';
import { Injector } from "@angular/core/src/di";

describe('BimDataConverterService', () => {

    let converter: BimDataConverter;
    let injector: Injector;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
            ],
            providers: [
                CurrencyPipe,
                AmountPipe,
                BimDataConverter,
                ColorService
            ]
        });
    });

    it('should exist', () => {
        converter = getTestBed().get(BimDataConverter);
        expect(converter).toBeDefined();
    });

    it('should convert to BimData', () => {
        let data: Array<PacketDrgBySupplierDeductionTypeResource> =
            [1, 2, 3, 4].map(i => ({ part: i, count: i * 10, value: i * 100 }));
        let result: Array<BimDatum> = converter.convert(data, id => 'test-id', label => 'test-label', id => 'color-id');

        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toEqual(data.length);

        [1, 2, 3, 4].forEach(i => {
            expect(result[i - 1].id).toEqual('test-id');

            let expected = i / (1 + 2 + 3 + 4) * 100;
            expect(result[i - 1].percent.value).toEqual(expected);
            expect(result[i - 1].percent.label).toEqual(expected.toFixed(2) + ' %\ntest-label');

            expect(result[i - 1].count.value).toEqual(i * 10);
            expect(result[i - 1].count.label).toEqual((i * 10) + '\ntest-label');

            expect(result[i - 1].amount.value).toEqual(i * 100);
            expect(result[i - 1].amount.label).toEqual((i * 100) + ' €\ntest-label');
        })
    });

    it('should generate pie data', () => {
        let data: Array<BimDatum> =
            [1, 2, 3, 4].map(i => ({
                id: 'id-' + i,
                colorId: '#123456',
                count: { value: i * 10, label: 'label-count-' + i },
                amount: { value: i * 10, label: 'label-amount-' + i },
                percent: { value: i * 10, label: 'label-percent-' + i },
                bold: (i % 2) === 0
            }))
        let result = converter.generatePieData(data, 'percent');
        expect(result.length).toEqual(data.length);
        result.forEach((r, i) => {
            expect(r.id).toEqual(data[i].id);
            expect(r.value).toEqual(data[i].percent.value);
            expect(r.label).toEqual(data[i].percent.label);
            expect(r.bold).toEqual(data[i].bold);
        });
    });
});
