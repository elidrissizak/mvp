import { Observable } from 'rxjs/Rx';
import { WaitService, WaitData } from './wait.service';
import { TranslateService } from '@ngx-translate/core';
import { TestBed, async, getTestBed } from '@angular/core/testing';
import { Injector } from "@angular/core/src/di";
import { LanguageService } from '../language/language.service';
import { SharedModule } from '../../shared.module';


describe('WaitService', () => {

    let service: WaitService;
    let injector: Injector;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                SharedModule
            ],
            providers: [
                LanguageService
            ]
        });
        service = getTestBed().get(WaitService);
    });

    it('should exist', () => {
        expect(WaitService).toBeDefined();
        expect(service).toBeDefined();
    });

    it('should start wait and fire observable', () => {
        let observable = Observable.of(true);
        service.onWait().subscribe((data: WaitData) => {
            expect(data.task).toEqual(observable);
            expect(data.param).toEqual('param');
        });
        service.startWait(observable, 'param');
        //service.stopWait();
    });

    // it('should xxxxxxx', () => {
    //     service.onWait().subscribe((data: WaitData) => {
    //         //expect(data.task instanceof WaitData);
    //         expect(data.task).toEqual('message');;
    //         expect(data.param).toEqual('param');;
    //     });
    //     service.startWait('message', 'param');
    // });

});
