import { TaskService } from './../../../../shared/services/task/task.service';
import { UserService } from './../../../../shared/services/user/user.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { User } from './../../../../shared/entities/user/user.entity';
import { RoleService, ROLES, ROLES_TYPE, Role, ApiRole } from './../../../shared/services/role.service';
import { Component } from '@angular/core';

@Component({
    selector: 'users-list',
    templateUrl: 'users-list.component.html',
    styleUrls: ['users-list.component.scss']
})
export class UsersListComponent {

    public roles: ROLES_TYPE;
    public rolesFilters: Array<string> = [''];
    public users: Array<User> = [];
    public filteredUsers: Array<User> = this.users;

    constructor(
        private userService: UserService,
        private taskService: TaskService,
        private router: Router) {
        this.roles = ROLES;
    }

    ngOnInit() {
        this.taskService.do(this._getUsers()).subscribe();
    }

    private _getUsers(): Observable<Array<User>> {
        return this.userService.getUsers().map(users => {
            users.sort((u1: User, u2: User, ) => {
                let n1 = u1.lastName.toLocaleLowerCase();
                let n2 = u2.lastName.toLocaleLowerCase();
                if (n1 < n2) return -1;
                if (n1 > n2) return 1;
                return 0;
            });
            this.users = this.filteredUsers = users;
            return users;
        });
    }

    update() {
        this.filteredUsers = !this.rolesFilters[0]
            ? this.users
            : this.users.filter(u => u.roles.includes(this.rolesFilters[0]));
    }

    goToUserCreate() {
        const options = {
            outlets: {
                usersTab: ['user-create']
            }
        };
        this.router.navigate(['/core/admin/', options], { skipLocationChange: true });
    }

    goToUserView(user: User) {
        const options = {
            outlets: {
                usersTab: ['user-read', user.ipn]
            }
        };
        this.router.navigate(['/core/admin/', options], { skipLocationChange: true });
    }
}
