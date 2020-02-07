import { GsfaInputComponent } from './admin/components/gsfa-input/gsfa-input.component';
import { AdminModule } from './admin/admin.module';
import { CoreSideComponent } from './core-side.component';
import { CoreHeaderComponent } from './core-header.component';
import { TreemapComponent } from './shared/components/treemap/treemap.component';
import { PieComponent } from './shared/components/pie/pie.component';
import { CoreErrorComponent } from './shared/components/core-error/core-error.component';
import { SectionService } from './shared/services/section.service';
import { CoreIconsComponent } from './shared/components/core-icons/core-icons.component';
import { BimAssistantModule } from './bim-assistant/bim-assistant.module';
import { DashboardModule } from './dashboard/dashboard.module';
//import { LoggedUserResolver } from './logged-user.resolver.dev';
import { ErrorService } from './../shared/services/error/error.service';
import { WaitService } from './../shared/services/wait/wait.service';
import { TaskService } from './../shared/services/task/task.service';
import { SharedModule } from './../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CoreComponent } from './core.component';
import { CoreRoutingModule } from './core-routing.module';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [
        SharedModule,
        CoreRoutingModule,
        DashboardModule,
        BimAssistantModule,
        AdminModule,
    ],
    declarations: [
        CoreComponent,
        CoreHeaderComponent,
        CoreSideComponent,
        CoreIconsComponent,
        CoreErrorComponent,
    ],
    providers: [
        //LoggedUserResolver,
    ],
    exports: [
    ]
})
export class CoreModule {

    constructor(
        private taskService: TaskService,
        private errorService: ErrorService) {
        this.taskService.setErrorService(this.errorService);
    }
}
