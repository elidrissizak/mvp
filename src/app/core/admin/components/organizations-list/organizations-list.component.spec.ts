import { MockRestService } from './../../../../shared/services/network/rest.service.mock';
import { SharedModule } from './../../../../shared/shared.module';
import { LanguageService } from './../../../../shared/services/language/language.service';
import { CurrencyService } from './../../../shared/services/currency/currency.service';
import { CountryService } from './../../../shared/services/country/country.service';
import { Observable } from 'rxjs/Rx';
import { RestService } from './../../../../shared/services/network/rest.service';
import { OrganizationService } from './../../../shared/services/organization/organization.service';
import { NgPipesModule } from 'ngx-pipes';
import { I18nLabelPipe } from './../../../shared/pipes/i18n-label/i18n-label.pipe';
import { FlagCountryPipe } from './../../../shared/pipes/flag-country/flag-country.pipe';
import { CountryPipe } from './../../../shared/pipes/country/country.pipe';
import { OrganizationsTableComponent } from './../organizations-table/organizations-table.component';
import { AdminModule } from './../../admin.module';
import { CoreModule } from './../../../core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { OrganizationsListComponent } from './organizations-list.component';
import { TranslateModule } from '@ngx-translate/core';
import { Injectable } from '@angular/core';

@Injectable()
class UrlsProvider {
    onGet(uri: string) {
        switch (uri) {
            default:
                return [];
        }
    }
}

describe('OrganizationsListComponent', () => {
    let component: OrganizationsListComponent;
    let fixture: ComponentFixture<OrganizationsListComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [CoreModule],
            providers: [
                UrlsProvider,
                { provide: RestService, useClass: MockRestService, deps: [UrlsProvider] },]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(OrganizationsListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
