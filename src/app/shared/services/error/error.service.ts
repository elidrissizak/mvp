import { ReplaySubject } from 'rxjs/ReplaySubject';
import { IErrorService } from './../task/task.service';
import { Injectable } from '@angular/core';

export interface ErrorData {
    error: any;
    param: any;
    code: string;
    message: string;
}

@Injectable()
export class ErrorService implements IErrorService {

    private _onError = new ReplaySubject<any>();

    onError(error: any, initParam?: any): void {
        let errorData: ErrorData = {
            error,
            param: initParam, // set in TaskService
            code: error.code ? error.code.toString() : undefined,
            message: error.message
        };
        errorData.code = error.status || errorData.code;
        errorData.message = error.error || errorData.message;
        this._onError.next(errorData);
    }

    onErrorObservable() {
        return this._onError.asObservable();
    }
}
