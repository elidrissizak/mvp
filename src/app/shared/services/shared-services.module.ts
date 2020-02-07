import { UserService } from './user/user.service';
import { UserResolver } from './../entities/user/user.resolver';
import { RestService } from './network/rest.service';
import { ConfigService } from './config/config.service';
import { ErrorService } from './error/error.service';
import { WaitService } from './wait/wait.service';
import { SessionService } from './session/session.service';
import { AuthService } from './session/auth.service';
import { TaskService } from './task/task.service';
import { NgModule } from '@angular/core';
import { LanguageService } from './language/language.service';

@NgModule({
    imports: [
    ],
    declarations: [
    ],
    providers: [
        TaskService,
        AuthService,
        SessionService,
        WaitService,
        ErrorService,
        LanguageService,
        ConfigService,
        RestService,
        UserService,
        UserResolver
    ],
    entryComponents: [
    ]
})
export class SharedServicesModule { }
