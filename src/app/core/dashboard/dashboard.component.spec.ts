import { Observable } from 'rxjs/Rx';
import { MockRestService } from '../../shared/services/network/rest.service.mock';
import { RestService } from '../../shared/services/network/rest.service';
import { DrgsRepartitionService } from '../shared/services/drgs-repartition.service';
import { Deduction, DeductionService } from '../shared/services/deduction/deduction.service';
import { SessionService } from '../../shared/services/session/session.service';
import { MockConfigService } from '../../shared/services/config/config.service.mock';
import { ConfigService } from '../../shared/services/config/config.service';
import { User } from '../../shared/entities/user/user.entity';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { TabsModule } from 'ngx-bootstrap/tabs/tabs.module';
import { BimByStatusesComponent } from 'app/core/dashboard/components/bim-by-statuses/bim-by-statuses.component';
import { BimTabComponent } from 'app/core/dashboard/components/bim-tab/bim-tab.component';
import { PieComponent } from 'app/core/shared/components/pie/pie.component';
import { CoreModule } from 'app/core/core.module';

Injectable()
class UrlsProvider {
  onGet() {
    return [];
  }
}

class MockSessionService {
  getLoggedUser() {
    return new User();
  }
}

class MockDeductionService {
  getDeductionGroups(withSupplier: boolean): Observable<Deduction[]> {
    return Observable.of([]);
  }
}

class MockDrgsRepartitionService {
  getByStatuses(username: string) {
    return Observable.of([]);
  }

  getBim(username: string) {
    return Observable.of([]);
  }

  getByDeductions(username: string, withSupplier: boolean) {
    return Observable.of([]);
  }
}

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  let router = {
    navigate: jasmine.createSpy('navigate')
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), TabsModule.forRoot(), CoreModule],
      declarations: [

      ],
      providers: [
        UrlsProvider,
        { provide: Router, useValue: router },
        { provide: SessionService, useClass: MockSessionService },
        { provide: DeductionService, useClass: MockDeductionService },
        { provide: DrgsRepartitionService, useClass: MockDrgsRepartitionService },
        { provide: SessionService, useClass: MockSessionService },
        { provide: RestService, useClass: MockRestService, deps: [UrlsProvider] }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
