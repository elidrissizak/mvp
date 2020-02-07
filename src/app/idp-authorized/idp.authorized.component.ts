import { ConfigService } from './../shared/services/config/config.service';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './../shared/services/session/auth.service';
import { WaitService, WaitData } from './../shared/services/wait/wait.service';
import { Component } from '@angular/core';
import { TaskService } from "../shared/services/task/task.service";
import { Router } from "@angular/router";
import { SessionService } from "../shared/services/session/session.service";


@Component({
    selector: 'idp-authorized',
    templateUrl: 'idp.component.html'
})
export class IdpAuthorizedComponent {

    waiting: WaitData = { isWaiting: false, task: undefined, param: undefined };
    tasks = new Array<any>();

    constructor(
        private authService: AuthService,
        private taskService: TaskService,
        private waitService: WaitService,
        private router: Router,
        private sessionService: SessionService,
        private translate: TranslateService,
        private config: ConfigService) {

        this.taskService.setWaitService(this.waitService);
    }

    ngOnInit() {
        if (this.config.get('disableAuthentication') === true) {
            this.sessionService.setUserInfo('Antoine', 'Viau', 'antoineviau');
            this.router.navigate([this.config.get('startWith')]);
            return;
        }
        this.waitService.onWait().subscribe((waiting: WaitData) =>
            // A task has started or stopped waiting
            this.tasks = waiting.isWaiting === true
                // started : we add it to the tasks array
                ? this.tasks = [...this.tasks, { task: waiting.task, param: waiting.param }]
                // stopped : we remove it from the tasks array
                : this.tasks = this.tasks.filter(t => t.task !== waiting.task)
        );

        this.taskService.do(
            this.authService.me(), '...')
            .subscribe(userInfo => {
                let firstName = userInfo.name.split(" ")[1];
                let lastName = userInfo.name.split(" ")[0];
                let userName = userInfo.username;
                this.sessionService.setUserInfo(firstName, lastName, userName);
                this.router.navigate([userInfo
                    ? this.config.get('startWith') || '/core/dashboard'
                    : '/forbidden'])
            },
            () => this.router.navigate(['/forbidden']));
    }
}
