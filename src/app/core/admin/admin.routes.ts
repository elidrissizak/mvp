import { UsersListComponent } from './components/users-list/users-list.component';
import { UserResolver } from './../../shared/entities/user/user.resolver';
import { OrganizationsTabComponent } from './components/organizations-tab/organizations-tab.component';
import { OrganizationsListComponent } from './components/organizations-list/organizations-list.component';
import { UsersTabComponent } from './components/users-tab/users-tab.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { AdminComponent } from './admin.component';

const READ_STATE = 'read';
const CREATE_STATE = 'create';
const UPDATE_STATE = 'update';

export const ROUTES = [{
    path: 'admin',
    component: AdminComponent,
    children: [
        {
            path: 'users-list',
            component: UsersListComponent,
            outlet: 'usersTab'
        },
        {
            path: 'user-view/:ipn',
            component: UserFormComponent,
            outlet: 'usersTab'
        },
        {
            path: 'organizations-list',
            component: OrganizationsListComponent,
            outlet: 'organizationsTab',
        },
        {
            path: 'user-read/:ipn',
            component: UserFormComponent,
            outlet: 'usersTab',
            resolve: {
                user: UserResolver
            },
            data: {
                formState: READ_STATE,
                title: 'ADMIN.VIEW_USER'
            }
        },
        {
            path: 'user-create',
            component: UserFormComponent,
            outlet: 'usersTab',
            data: {
                formState: CREATE_STATE,
                title: 'ADMIN.CREATE_USER'
            }
        },
        {
            path: 'user-update/:ipn',
            component: UserFormComponent,
            outlet: 'usersTab',
            resolve: {
                user: UserResolver
            },
            data: {
                formState: UPDATE_STATE,
                title: 'ADMIN.UPDATE_USER'
            }
        }
    ]
}];
