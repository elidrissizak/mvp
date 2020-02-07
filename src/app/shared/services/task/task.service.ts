import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

export interface IWaitService {
    startWait(task: any, param: any): void;
    stopWait(task: any, param: any): void;
}

export interface IErrorService {
    onError(error: any, param: any): void;
}

export interface ICompletedService {
    onCompleted(param: any): void;
}

/**
 * TaskService will manage wait, completion and error events. 
 */
@Injectable()
export class TaskService {

    private waitService: IWaitService;
    private errorService: IErrorService;
    private completedService: ICompletedService;

    constructor() { }

    setWaitService(waitService: IWaitService) {
        this.waitService = waitService;
    }

    setErrorService(errorService: IErrorService) {
        this.errorService = errorService;
    }

    setCompletedService(completedService: ICompletedService) {
        this.completedService = completedService;
    }

    /**
     * 
     * @param observable the task
     * @param waitParam param sent to the wait service each time it's used
     * @param errorParam param sent to the error service each time it's used
     * @param completedParam param sent to the completed service each time it's used
     */
    do(observable: Observable<any>, waitParam?: any, errorParam?: any, completedParam?: any): Observable<any> {
        if (this.waitService) {
            this.waitService.startWait(observable, waitParam);
        }
        let shared = observable.share();
        shared.subscribe(
            undefined,
            (error) => {
                this.waitService.stopWait(observable, waitParam);
                this.errorService && this.errorService.onError(error, errorParam);
            },
            () => {
                this.waitService && this.waitService.stopWait(observable, waitParam);
                this.completedService && this.completedService.onCompleted(completedParam);
            });
        return shared;
    }
}
