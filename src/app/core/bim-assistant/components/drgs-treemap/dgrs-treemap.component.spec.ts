import { User } from '../../../../shared/entities/user/user.entity';
import { TaskService } from '../../../../shared/services/task/task.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DateToMysqlDatePipe } from '../../../shared/pipes/date-to-mysql-date.pipe';
import { MockRestService } from '../../../../shared/services/network/rest.service.mock';
import { RestService } from '../../../../shared/services/network/rest.service';
import { DrgsTreemapComponent } from './drgs-treemap.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from 'app/shared/shared.module';
import { Injectable, NO_ERRORS_SCHEMA } from '@angular/core';
import { DrgsRepartitionService } from 'app/core/shared/services/drgs-repartition.service';
import { SessionService } from 'app/shared/services/session/session.service';
import { ColorService } from 'app/core/shared/services/color.service';

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
  getToken() {
    return 'token';
  }
}

class MockTaskService extends TaskService { }

describe('DrgsTreemapComponent', () => {
  let component: DrgsTreemapComponent;
  let fixture: ComponentFixture<DrgsTreemapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        TranslateModule.forRoot()
      ],
      declarations: [DrgsTreemapComponent],
      providers: [
        UrlsProvider,
        { provide: TaskService, useClass: MockTaskService },
        { provide: RestService, useClass: MockRestService, deps: [UrlsProvider] },
        { provide: SessionService, useClass: MockSessionService },
        ColorService,
        DrgsRepartitionService,
        DateToMysqlDatePipe,
        TranslateService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrgsTreemapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
