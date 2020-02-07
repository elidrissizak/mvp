import { ColorService } from './color.service';
import { TranslateService } from '@ngx-translate/core';
import { TestBed, async, getTestBed } from '@angular/core/testing';
import { Injector } from "@angular/core/src/di";


describe('ColorService', () => {

    let service: ColorService;
    let injector: Injector;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
            ],
            providers: [
                ColorService
            ]
        });
        service = getTestBed().get(ColorService);
    });

    it('should exist', () => {
        expect(ColorService).toBeDefined();
        expect(service).toBeDefined();
    });

    it('should get the same color for the same key', () => {
        let key = 'someKey';
        let color = service.get(key);
        expect(service.get(key)).toEqual(color);
    });

    it('should get the different color for the different key when less than palette colors', () => {
        let key1 = 'someKey1';
        let key2 = 'someKey2';
        expect(service.get(key1) === service.get(key2)).toBe(false);
    });

    it('should rotate in the palette', () => {
        let keys = (new Array(13)).fill('').map((d, i) => 'key' + i);
        let colors = keys.map(k => service.get(k));
        expect(colors[10]).toEqual(colors[0]);
        expect(colors[11]).toEqual(colors[1]);
    });


});
