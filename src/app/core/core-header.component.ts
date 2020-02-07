import { LanguageService } from './../shared/services/language/language.service';
import { User } from './../shared/entities/user/user.entity';
import { Component, Output, EventEmitter } from '@angular/core';
import { TaskService } from "../shared/services/task/task.service";
import { RestService } from "../shared/services/network/rest.service";
import { SessionService } from '../shared/services/session/session.service';

@Component({
    selector: 'core-header',
    templateUrl: 'core-header.component.html',
    styleUrls: ['core-header.component.scss']
})
export class CoreHeaderComponent {

    user: User;
    @Output('openSideMenu') openSideMenuEvent = new EventEmitter();

    apiVersion: string;

    constructor(
        public languageService: LanguageService,
        public sessionService: SessionService,
        private taskService: TaskService,
        private restService: RestService) { }

    ngOnInit() {
        this.user = this.sessionService.getLoggedUser();
        this.taskService.do(this.restService.getApiInfos())
            .subscribe(data => {
                this.apiVersion = data.app.version;
            });
    }

    openSideMenu() {
        this.openSideMenuEvent.emit();
    }

}

