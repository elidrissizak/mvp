import { MockRestService } from './../../../../shared/services/network/rest.service.mock';
import { LanguageService } from './../../../../shared/services/language/language.service';
import { TaskService } from './../../../../shared/services/task/task.service';
import { MockConfigService } from './../../../../shared/services/config/config.service.mock';
import { RestService } from './../../../../shared/services/network/rest.service';
import { IconComponent } from './../../../../shared/components/icon/icon.component';
import { DeductionService } from './../../../shared/services/deduction/deduction.service';
import { ColorService } from './../../../shared/services/color.service';
import { DeductionsCodesComponent } from './codes-deductions.component';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule, Router } from '@angular/router';
import { CoreModule } from './../../../core.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { ConfigService } from './../../../../shared/services/config/config.service';
import { I18nLabelPipe } from '../../../shared/pipes/i18n-label/i18n-label.pipe';
import { CoreSharedModule } from '../../../shared/core-shared.module';
import { SharedModule } from '../../../../shared/shared.module';

@Injectable()
class UrlsProvider {
    onGet() {
        return [];
    }
}

describe('DeductionsCodesTabComponent', () => {
    let component: DeductionsCodesComponent;
    let fixture: ComponentFixture<DeductionsCodesComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TranslateModule.forRoot(), CoreSharedModule, SharedModule],
            declarations: [DeductionsCodesComponent],
            providers: [
                TaskService,
                LanguageService,
                ColorService,
                DeductionService,
                TranslateService,
                { provide: ConfigService, useClass: MockConfigService },
                UrlsProvider,
                { provide: RestService, useClass: MockRestService, deps: [UrlsProvider] }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DeductionsCodesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
