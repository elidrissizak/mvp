import { TranslateService } from '@ngx-translate/core';
import { ErrorService, ErrorData } from './../shared/services/error/error.service';
import { Router } from '@angular/router';
import { User } from './../shared/entities/user/user.entity';
import { LanguageService } from './../shared/services/language/language.service';
import { TaskService } from './../shared/services/task/task.service';
import { WaitService, WaitData } from './../shared/services/wait/wait.service';
import { Component, ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'core',
    templateUrl: 'core.component.html',
    styleUrls: ['core.component.scss']
})
export class CoreComponent {

    waiting: WaitData = { isWaiting: false, task: undefined, param: undefined };
    currentSection = 'dashboard';
    sideMenuClosed = true;
    tasks = new Array<any>();
    message: string;

    constructor(
        private taskService: TaskService,
        private waitService: WaitService,
        private errorService: ErrorService,
        private translate: TranslateService) {
        this.taskService.setWaitService(this.waitService);
    }

    ngOnInit() {
        this.waitService.onWait().subscribe((waiting: WaitData) => {
            // Why the Promise.resolve(null) ? 
            // See : https://blog.angularindepth.com/a-e3fd9ce7dbb4            
            Promise.resolve(null).then(() => this.tasks = waiting.isWaiting
                ? this.tasks = [...this.tasks, { task: waiting.task, param: waiting.param }]
                : this.tasks = this.tasks.filter(t => t.task !== waiting.task)
            )
        });

        this.errorService.onErrorObservable().subscribe((error: ErrorData) => {
            this.message = error.message;
            //if (error.code !== undefined) { // === '401' && error.message.indexOf('invalid_token') !== -1) {
            this.message = this.translate.instant('COMMON.EXPIRED_SESSION');
            //}
        })
    }
}
