import { DrgsRepartitionService } from '../../../shared/services/drgs-repartition.service';
import { User } from '../../../../shared/entities/user/user.entity';
import { Observable } from 'rxjs/Rx';
import { Deduction, DeductionService } from '../../../shared/services/deduction/deduction.service';
import { Router } from '@angular/router';
import { SessionService } from '../../../../shared/services/session/session.service';
import { Injectable } from '@angular/core';
import { MockRestService } from '../../../../shared/services/network/rest.service.mock';
import { RestService } from '../../../../shared/services/network/rest.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { I18nLabelPipe } from 'app/core/shared/pipes/i18n-label/i18n-label.pipe';
import { PieComponent } from 'app/core/shared/components/pie/pie.component';
import { DrgUnitSelectorComponent } from 'app/core/dashboard/components/drg-unit-selector/drg-unit-selector.component';
import { CoreModule } from 'app/core/core.module';
import { TaskService } from 'app/shared/services/task/task.service';
import { BimByDeductionsComponent } from './bim-by-deductions.component';

@Injectable()
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
  getByDeductions(username: string) {
    return Observable.of([]);
  }
}

describe('BimByDeductionsComponent', () => {
  let component: BimByDeductionsComponent;
  let fixture: ComponentFixture<BimByDeductionsComponent>;

  let router = {
    navigate: jasmine.createSpy('navigate')
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), CoreModule],
      declarations: [
      ],
      providers: [
        TaskService,
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
    fixture = TestBed.createComponent(BimByDeductionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
