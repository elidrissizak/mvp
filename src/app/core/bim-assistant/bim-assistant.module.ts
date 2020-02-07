import { PeriodService } from './services/period.service';
import { FetchDrgsService } from './services/fetch-drgs.service';
import { LinksModalComponent } from './components/links-modal/links-modal.component';
import { LinksService } from './services/links.service';
import { LinksModalFieldComponent } from './components/links-modal/links-modal-field.component';
import { PacketExporterComponent } from './components/packet-exporter/packet-exporter.component';
import { GroupbyBarComponent } from './components/groupby-bar/groupby-bar.component';
import { HistoryService } from './services/history.service';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { CoreSharedModule } from './../shared/core-shared.module';
import { SuggestionsGlobalComponent } from './components/suggestions-global/suggestions-global.component';
import { SuggestionsComponent } from './components/suggestions/suggestions.component';
import { DeductionsCodesComponent } from './components/codes-deductions/codes-deductions.component';
import { PeriodPickerComponent } from './components/period-picker/period-picker.component';
import { MonthYearPickerComponent } from './components/period-picker/month-year-picker.component';
import { DrgsTreemapComponent } from './components/drgs-treemap/drgs-treemap.component';
import { CurrencyPipe } from '@angular/common';
import { CoreModule } from './../core.module';
import { BimAssistantComponent } from './bim-assistant.component';
import { NgModule } from '@angular/core';
import { SharedModule } from './../../shared/shared.module';
import { AccordionModule } from "ngx-bootstrap/accordion";
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap';
import { DataService } from './services/data.service';


@NgModule({
    imports: [
        SharedModule,
        CoreSharedModule,
        AccordionModule.forRoot(),
        TooltipModule.forRoot(),
        ModalModule.forRoot(),
    ],
    declarations: [
        BimAssistantComponent,
        DrgsTreemapComponent,
        GroupbyBarComponent,
        MonthYearPickerComponent,
        PeriodPickerComponent,
        DeductionsCodesComponent,
        SuggestionsComponent,
        SuggestionsGlobalComponent,
        PacketExporterComponent,
        DrgsTreemapComponent,
        BreadcrumbsComponent,
        LinksModalComponent,
        LinksModalFieldComponent,
    ],
    providers: [
        FetchDrgsService,
        HistoryService,
        PeriodService,
        LinksService,
        DataService
    ],
    exports: [
        BimAssistantComponent
    ],
    entryComponents: [
        LinksModalComponent
    ]
})
export class BimAssistantModule { }
