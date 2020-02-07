// /**
//  * Utilisé en dev uniquement.
//  * Force la connexion d'un user de test à chaque changement de route.
//  */
// import { TaskService } from './../shared/services/task/task.service';
// import { User } from './../shared/entities/user/user.entity';
// import { SessionService, Token } from './../shared/services/session/session.service';
// import { Injectable } from '@angular/core';
// import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
// import { AuthService } from './../shared/services/session/auth.service';
// import { ConfigService } from './../shared/services/config/config.service';

// @Injectable()
// export class LoggedUserResolver implements Resolve<User> {

//     constructor(
//         private taskService: TaskService,
//         private authService: AuthService,
//         private sessionService: SessionService,
//         private config: ConfigService
//     ) { }

//     resolve(route: ActivatedRouteSnapshot) {
//         if (this.sessionService.isLoggedIn()) {
//             return undefined;
//         }
//         return undefined;
//     }

// }
