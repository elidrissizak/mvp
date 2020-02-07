import { Observable } from 'rxjs/Rx';
import { TaskService, IWaitService, ICompletedService, IErrorService } from './task.service';
import { TranslateService } from '@ngx-translate/core';
import { TestBed, async, getTestBed } from '@angular/core/testing';
import { Injector } from "@angular/core/src/di";

class MockWaitService implements IWaitService {
    startWait(task, param) {
    }
    stopWait(task, param) {
    }
}

class MockCompletedService implements ICompletedService {
    onCompleted(param) {
    }
}

class MockErrorService implements IErrorService {
    onError(error, param) {
    }
}

describe('TaskService', () => {

    let service: TaskService;
    let injector: Injector;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                TaskService
            ]
        });
        service = getTestBed().get(TaskService);
    });

    it('should exist', () => {
        expect(TaskService).toBeDefined();
        expect(service).toBeDefined();
    });

    it('should call success callback on success', done => {
        let o = Observable.of(true);
        service.do(o).subscribe(
            data => { expect(data).toBe(true); done() },
            () => { fail('It should succeed'); done() }
        );
    });

    it('should call fail callback on fail', done => {
        let o = Observable.throw('error');
        let ws = new MockWaitService();
        service.setWaitService(ws);
        service.do(o).subscribe(
            data => { fail('It should fail'); done() },
            data => { expect(data).toEqual('error'); done(); }
        );
    });

    it('should call wait methods', done => {
        let o = Observable.timer(1000);
        let ws = new MockWaitService();
        service.setWaitService(ws);
        spyOn(ws, 'startWait').and.callThrough();
        spyOn(ws, 'stopWait').and.callThrough();
        service.do(o, 42).subscribe(
            () => expect(ws.startWait).toHaveBeenCalledWith(o, 42),
            () => { },
            () => { expect(ws.stopWait).toHaveBeenCalledWith(o, 42); done(); }
        );
    });

    it('should call completed method', done => {
        let o = Observable.timer(1000);
        let cs = new MockCompletedService();
        service.setCompletedService(cs);
        spyOn(cs, 'onCompleted').and.callThrough();
        service.do(o, undefined, undefined, 42).subscribe(
            () => { },
            () => { },
            () => { expect(cs.onCompleted).toHaveBeenCalledWith(42); done(); }
        );
    });

    it('should call error method', done => {
        let o = Observable.throw('error');
        let es = new MockErrorService();
        let ws = new MockWaitService();
        service.setErrorService(es);
        service.setWaitService(ws);
        spyOn(es, 'onError').and.callThrough();
        spyOn(ws, 'stopWait').and.callThrough();
        service.do(o, undefined, undefined, 42).subscribe(
            () => { fail('should not succeed'); done() },
            () => {
                expect(es.onError).toHaveBeenCalled();
                expect(ws.stopWait).toHaveBeenCalled();
                done();
            },
            () => { fail('should not be completed'); done() }
        );
    });

});
