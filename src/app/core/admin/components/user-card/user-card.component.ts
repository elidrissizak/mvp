import { ROLES_TYPE, ROLES } from './../../../shared/services/role.service';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'user-card',
    templateUrl: 'user-card.component.html',
    styleUrls: ['user-card.component.scss']
})
export class UserCardComponent {
    @Input('user') user;

    public roles: ROLES_TYPE;

    constructor() {
        this.roles = ROLES;
    }

}
