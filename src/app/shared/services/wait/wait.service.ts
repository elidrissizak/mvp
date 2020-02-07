import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { IWaitService } from './../task/task.service';
import { Injectable } from '@angular/core';

export interface WaitData {
    isWaiting: boolean;
    task: any;
    param: any;
}

@Injectable()
export class WaitService implements IWaitService {

    private _onWait = new ReplaySubject<WaitData>();

    private isWaiting = true;

    private tasks = new Array<{ timestamp, task, param }>();

    constructor() { }

    onWait() {
        return this._onWait.asObservable();
    }

    startWait(task: Observable<any>, param: any): void {
        this.tasks.push({ timestamp: new Date(), task, param });
        this.isWaiting = true;
        this._onWait.next({ isWaiting: true, task, param });
    }

    stopWait(task: Observable<any>, param: any): void {
        this.tasks = this.tasks.filter(t => t.task !== task);
        setTimeout(() => {
            this._onWait.next({ isWaiting: false, task, param });
            if (this.tasks.length === 0) {
                this.isWaiting = false;
            }
        }, 10);//Math.floor(Math.random() * 3000));
    }
}
