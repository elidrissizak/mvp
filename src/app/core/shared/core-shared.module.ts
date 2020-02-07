import { DeductionService } from './services/deduction/deduction.service';
import { CountryService } from './services/country/country.service';
import { OrganizationService } from './services/organization/organization.service';
import { SharedModule } from '../../shared/shared.module';
import { GsfaService } from './services/gsfa.service';
import { RoleService } from './services/role.service';
import { SectionService } from './services/section.service';
import { ColorService } from './services/color.service';
import { DrgsRepartitionService } from './services/drgs-repartition.service';
import { AmountPipe } from './pipes/amount.pipe';
import { DateToMysqlDatePipe } from './pipes/date-to-mysql-date.pipe';
import { MysqlDateToDatePipe } from './pipes/mysql-date-to-date.pipe';
import { CommonModule } from '@angular/common';
import { TreemapComponent } from './components/treemap/treemap.component';
import { PieComponent } from './components/pie/pie.component';
import { NgModule } from '@angular/core';
import { ButtonModalComponent } from './components/button-modal/button-modal.component';
import { CountryPipe } from './pipes/country/country.pipe';
import { InputToggleComponent } from './components/input-toggle/input-toggle.component';
import { FlagCountryPipe } from './pipes/flag-country/flag-country.pipe';
import { I18nLabelPipe } from './pipes/i18n-label/i18n-label.pipe';
import { CurrencyService } from './services/currency/currency.service';

@NgModule({
    imports: [
        CommonModule,
        SharedModule
    ],
    declarations: [
        PieComponent,
        TreemapComponent,
        MysqlDateToDatePipe,
        DateToMysqlDatePipe,
        AmountPipe,
        ButtonModalComponent,
        CountryPipe,
        I18nLabelPipe,
        InputToggleComponent,
        FlagCountryPipe,
    ],
    providers: [
        SectionService,
        DrgsRepartitionService,
        DeductionService,
        MysqlDateToDatePipe,
        DateToMysqlDatePipe,
        AmountPipe,
        ColorService,
        RoleService,
        GsfaService,
        OrganizationService,
        CountryService,
        CurrencyService
    ],
    exports: [
        PieComponent,
        TreemapComponent,
        MysqlDateToDatePipe,
        DateToMysqlDatePipe,
        AmountPipe,
        CountryPipe,
        FlagCountryPipe,
        I18nLabelPipe,
        ButtonModalComponent,
        InputToggleComponent
    ]

})
export class CoreSharedModule { }
