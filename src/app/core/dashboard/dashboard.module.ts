import { DrgUnitSelectorComponent } from './components/drg-unit-selector/drg-unit-selector.component';
import { CoreModule } from './../core.module';
import { BimDataConverter } from './services/bim-data-converter.service';
import { BimByStatusesComponent } from './components/bim-by-statuses/bim-by-statuses.component';
import { BimTabComponent } from './components/bim-tab/bim-tab.component';
import { SharedModule } from './../../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { NgModule } from '@angular/core';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CoreSharedModule } from '../shared/core-shared.module';
import { BimByDeductionsComponent } from './components/bim-by-deductions/bim-by-deductions.component';

@NgModule({
    imports: [
        SharedModule,
        CoreSharedModule,
        TabsModule.forRoot(),
        ButtonsModule.forRoot()
    ],
    declarations: [
        DashboardComponent,
        BimTabComponent,
        BimByStatusesComponent,
        BimByDeductionsComponent,
        DrgUnitSelectorComponent
    ],
    providers: [
        BimDataConverter
    ],
    exports: [
        DashboardComponent
    ]

})
export class DashboardModule { }
