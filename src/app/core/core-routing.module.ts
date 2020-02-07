//import { LoggedUserResolver } from './logged-user.resolver.dev';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreComponent } from './core.component';
import { ROUTES as DASHBOARD_ROUTES } from './dashboard/dashboard.routes';
import { ROUTES as BIM_ASSISTANT_ROUTES } from './bim-assistant/bim-assistant.routes';
import { ROUTES as ADMIN_ROUTES } from './admin/admin.routes';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'core',
                component: CoreComponent,
                // resolve: {
                //     LoggedUser: LoggedUserResolver
                // },
                children: [
                    ...DASHBOARD_ROUTES,
                    ...BIM_ASSISTANT_ROUTES,
                    ...ADMIN_ROUTES
                ]
            }
        ])
    ]
})
export class CoreRoutingModule { }
