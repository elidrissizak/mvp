import { WaitService } from './shared/services/wait/wait.service';
import { SessionService } from './shared/services/session/session.service';
import { LanguageService } from './shared/services/language/language.service';
import { TaskService } from './shared/services/task/task.service';
import { AuthService } from './shared/services/session/auth.service';
import { ConfigService } from './shared/services/config/config.service';
import { RestService } from './shared/services/network/rest.service';
import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { APP_CONSTANTS } from './shared/app.constants';
import { Router } from '@angular/router';
import { TranslateService } from "@ngx-translate/core";


@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit {

    apiDown = false;

    constructor(
        private taskService: TaskService,
        private waitService: WaitService,
        private sessionService: SessionService,
        private languageService: LanguageService,
        private restService: RestService,
        private oauthService: OAuthService,
        private router: Router,
        private config: ConfigService,
        private authService: AuthService) {
        this.taskService.setWaitService(this.waitService);
    }

    ngOnInit() {

        this.languageService.setLanguage(this.languageService.getBrowserLanguage());

        // this.taskService.do(
        //     this.restService.checkHealth(), 'Connexion au serveur')
        //     .subscribe(
        //     healthy => healthy ? this.authService.oauth() : this.router.navigate(['/forbidden']),
        //     () => this.router.navigate(['/forbidden'])); // en principe inutile */

        if (this.authService.oauth() === false) {
            this.authService.oauthSignin();
        }
    }
}
