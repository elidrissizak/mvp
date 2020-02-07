import { UserService } from './../../services/user/user.service';
import { TaskService } from './../../services/task/task.service';
import { User } from './user.entity';

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class UserResolver implements Resolve<User> {

    constructor(
        private taskService: TaskService,
        private userService: UserService,
    ) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.taskService.do(this.userService.getUserByIpn(route.params['ipn']));
    }
}
