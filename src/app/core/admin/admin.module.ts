import { UsersListComponent } from './components/users-list/users-list.component';
import { GsfasComponent } from './components/gsfas/gsfas.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { CoreSharedModule } from '../shared/core-shared.module';
import { GsfaInputComponent } from './components/gsfa-input/gsfa-input.component';
import { UsersTabComponent } from './components/users-tab/users-tab.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { AdminComponent } from './admin.component';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from "@angular/core";
import { OrganizationsTabComponent } from './components/organizations-tab/organizations-tab.component';
import { OrganizationsListComponent } from './components/organizations-list/organizations-list.component';
import { UserDeleteComponent } from './components/user-delete/user-delete.component';
import { TypeaheadModule } from 'ngx-bootstrap';
import { OrganizationsTableComponent } from './components/organizations-table/organizations-table.component';


@NgModule({
    imports: [
        SharedModule,
        CoreSharedModule,
        TabsModule.forRoot(),
        TypeaheadModule.forRoot(),
    ],
    declarations: [
        AdminComponent,
        UsersTabComponent,
        UserCardComponent,
        UserFormComponent,
        UsersListComponent,
        OrganizationsTabComponent,
        OrganizationsListComponent,
        GsfaInputComponent,
        GsfasComponent,
        OrganizationsTabComponent,
        OrganizationsListComponent,
        UserDeleteComponent,
        OrganizationsTableComponent,
    ],
    entryComponents: [UserDeleteComponent],
    providers: [
    ],
    exports: [
        AdminComponent
    ]
})
export class AdminModule { }
