import { UserDeleteComponent } from '../user-delete/user-delete.component';
import { Router } from '@angular/router';
import { User } from './../../../../shared/entities/user/user.entity';
import { RoleService, ROLES, ROLES_TYPE } from './../../../shared/services/role.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'users-tab',
    templateUrl: 'users-tab.component.html',
    styleUrls: ['users-tab.component.scss']
})
export class UsersTabComponent implements OnInit {

    modal: any;

    constructor(private router: Router) { }

    ngOnInit() {
        const options = {
            usersTab: ['users-list']
        };
        this.router.navigate(['/core/admin/', { outlets: options }], { skipLocationChange: true });
    }

}
