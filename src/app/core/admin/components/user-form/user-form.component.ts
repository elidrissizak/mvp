import { UserService } from './../../../../shared/services/user/user.service';
import { ROLES, Role, ROLES_TYPE } from './../../../shared/services/role.service';
import { TaskService } from './../../../../shared/services/task/task.service';
import { UserDeleteComponent } from '../user-delete/user-delete.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from '../../../../shared/entities/user/user.entity';

const READ_STATE = 'read';
const CREATE_STATE = 'create';
const UPDATE_STATE = 'update';

@Component({
    selector: 'user-form',
    templateUrl: 'user-form.component.html',
    styleUrls: ['user-form.component.scss']
})
export class UserFormComponent implements OnInit {

    public title: string;
    public profiles: Array<Role>;
    public currentFormState: string;
    public deleteButtonModal: any;
    public permissionsInherited: boolean;

    public user: User;

    public formBehavior = {
        create: {
            active: false,
            submit: () => this._createUser()
        },
        update: {
            active: false,
            submit: () => this._updateUser()
        },
        read: {
            active: false,
            submit: () => console.log('Submit disabled on read mode.')
        }
    }

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService,
        private taskService: TaskService,
    ) {
        this.profiles = Object.keys(ROLES).map(r => ROLES[r]);
    }

    ngOnInit() {
        this.user = this.route.snapshot.data['user'] || this.userService.getEmptyUser();
        this.route.data.subscribe(data => {
            this.currentFormState = data.formState;
            this.title = data.title;
            this.formBehavior[this.currentFormState].active = true;
        });
        this.permissionsInherited = false;
        this._initDeleteButtonModal();
    }

    goToUpdate() {
        const options = {
            outlets: {
                usersTab: ['user-update', this.user.ipn]
            }
        };
        this.router.navigate(['/core/admin', options], { skipLocationChange: true })
    }

    cancel() {
        this.goToUsersList();
    }

    goToUsersList() {
        const options = {
            outlets: {
                usersTab: ['users-list']
            }
        };
        this.router.navigate(['/core/admin', options], { skipLocationChange: true });
    }

    save() {
        this.formBehavior[this.currentFormState].submit();
    }

    private _createUser() {
        this.taskService.do(this.userService.createUser(this.user))
            .subscribe((data) => this.goToUsersList());
    }

    private _updateUser() {
        this.taskService.do(this.userService.updateUser(this.user))
            .subscribe(() => this.goToUsersList())
    }

    private _initDeleteButtonModal() {
        this.deleteButtonModal = {
            component: UserDeleteComponent,
            text: 'COMMON.DELETE',
            params: { user: this.user },
            successCallback: () => { this._removeUserSuccess() },
            errorCallback: () => { console.log('Delete request cancelled'); }
        };
    }

    private _removeUserSuccess() {
        this.userService.deleteUser(this.user).subscribe(() => this.goToUsersList());
    };
}
