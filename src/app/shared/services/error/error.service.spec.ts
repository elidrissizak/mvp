import { Observable } from 'rxjs/Rx';
import { ErrorService, ErrorData } from './error.service';
import { APP_CONSTANTS } from './../../app.constants';
import { HttpModule, XHRBackend, Response, ResponseOptions } from '@angular/http';
import { inject, TestBed, async, getTestBed } from '@angular/core/testing';
import { Injector } from "@angular/core/src/di";
import { MockConnection, MockBackend } from "@angular/http/testing";

describe('ErrorService', () => {

    let service: ErrorService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ErrorService,
            ]
        });
        service = getTestBed().get(ErrorService);
    });

    it('should exist', () => {
        expect(ErrorService).toBeDefined();
        expect(service).toBeDefined();
    });

    it('should fire error (no task service param)', done => {
        let o: Observable<any> = service.onErrorObservable();
        expect(o).toBeDefined();
        o.subscribe((errorData: ErrorData) => {
            expect(errorData.error).toEqual('error');
            expect(errorData.param).toBeUndefined();
            expect(errorData.code).toBeUndefined();
            expect(errorData.message).toBeUndefined();
            done();
        })
        service.onError('error');
    });

    it('should fire error with specific parameters', done => {
        let o: Observable<any> = service.onErrorObservable();
        expect(o).toBeDefined();
        o.subscribe((errorData: ErrorData) => {
            expect(errorData.error).toEqual({ code: 'code', message: 'message' });
            expect(errorData.param).toBeUndefined();
            expect(errorData.code).toEqual('code');
            expect(errorData.message).toEqual('message');
            done();
        })
        service.onError({ code: 'code', message: 'message' });
    });
});
