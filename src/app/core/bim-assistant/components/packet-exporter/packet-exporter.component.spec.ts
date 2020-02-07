import { DrgView } from './../../../shared/models/drg-view.interface';
import { DateToMysqlDatePipe } from './../../../shared/pipes/date-to-mysql-date.pipe';
import { DrgsRepartitionService } from './../../../shared/services/drgs-repartition.service';
import { TaskService } from './../../../../shared/services/task/task.service';
import { By } from '@angular/platform-browser';
import { Subject } from 'rxjs/Rx';
import { ModalModule } from 'ngx-bootstrap';
import { PacketExporterComponent } from './packet-exporter.component';
import { MockSessionService } from './../../../../shared/services/session/session.service.mock';
import { SessionService } from './../../../../shared/services/session/session.service';
import { MockConfigService } from './../../../../shared/services/config/config.service.mock';
import { RestService } from './../../../../shared/services/network/rest.service';
import { IconComponent } from './../../../../shared/components/icon/icon.component';
import { DeductionService } from './../../../shared/services/deduction/deduction.service';
import { ColorService } from './../../../shared/services/color.service';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule, Router } from '@angular/router';
import { CoreModule } from './../../../core.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable, Component } from '@angular/core';
import { ConfigService } from './../../../../shared/services/config/config.service';
import { MockRestService } from '../../../../shared/services/network/rest.service.mock';
import { DrgsTreemapDatum } from '../../services/fetch-drgs.service';

@Injectable()
class UrlsProvider {
    onGet() {
        return [];
    }
}

@Component({
    selector: 'test-host',
    template: `<packet-exporter></packet-exporter>`
})
class TestHostComponent {
    public exportTrigger: Subject<{ tmDatum: DrgsTreemapDatum, drgView: DrgView, withSupplier: boolean }> = new Subject();
}

describe('PacketExporterComponent', () => {
    let testHostComponent: TestHostComponent;
    let testHostFixture: ComponentFixture<TestHostComponent>;
    // let component: PacketExporterComponent;
    // let fixture: ComponentFixture<PacketExporterComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                TranslateModule.forRoot(),
                ModalModule.forRoot()

            ],
            declarations: [PacketExporterComponent, IconComponent, TestHostComponent],
            providers: [
                TaskService,
                DrgsRepartitionService,
                DateToMysqlDatePipe,
                { provide: ConfigService, useClass: MockConfigService },
                { provide: SessionService, useClass: MockSessionService },
                UrlsProvider,
                { provide: RestService, useClass: MockRestService, deps: [UrlsProvider] }
            ]
        }).compileComponents();
        testHostFixture = TestBed.createComponent(TestHostComponent);
        testHostComponent = testHostFixture.componentInstance;
        testHostFixture.detectChanges();
    });

    it('should create', () => {
        let component = testHostFixture.debugElement.query(By.css('packet-exporter'));
        expect(component).toBeTruthy();
    });

    // it('should trigger', () => {
    //     let tmDatum: DrgsTreemapDatum = { id: 'id', label: 'label', value: 10, 
    //backgroundColor: '#000000', textColor: '#ffffff', 
    //rawDatum: {}, children: [], state: STATE.NEUTRAL };
    //     let drgView: DrgView = {
    //         filters: undefined,
    //         groupby: undefined
    //     }
    //     testHostComponent.exportTrigger.next({ tmDatum, drgView, withSupplier: false })
    // });
});
