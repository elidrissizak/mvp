import { CoreRoutingModule } from './core-routing.module';
import { Injectable, NO_ERRORS_SCHEMA } from '@angular/core';
import { MockRestService } from '../shared/services/network/rest.service.mock';
import { RestService } from '../shared/services/network/rest.service';
import { TaskService } from '../shared/services/task/task.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CoreComponent } from 'app/core/core.component';
import { SpinnerComponent } from 'app/shared/components/spinner/spinner.component';
import { CoreErrorComponent } from 'app/core/shared/components/core-error/core-error.component';
import { CoreIconsComponent } from 'app/core/shared/components/core-icons/core-icons.component';
import { CoreHeaderComponent } from 'app/core/core-header.component';
import { CoreSideComponent } from 'app/core/core-side.component';
import { RouterModule } from '@angular/router/src/router_module';
import { DashboardComponent } from 'app/core/dashboard/dashboard.component';
import { BimAssistantComponent } from 'app/core/bim-assistant/bim-assistant.component';
import { AdminComponent } from 'app/core/admin/admin.component';
import { WaitService } from 'app/shared/services/wait/wait.service';
import { ErrorService } from 'app/shared/services/error/error.service';

@Injectable()
class UrlsProvider {
  onGet() {
    return [];
  }
}

describe('CoreSideComponent', () => {
  let component: CoreComponent;
  let fixture: ComponentFixture<CoreComponent>;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
      ],
      declarations: [
        CoreComponent
      ],
      providers: [
        TaskService,
        TranslateService,
        UrlsProvider,
        WaitService,
        ErrorService,
        { provide: RestService, useClass: MockRestService, deps: [UrlsProvider] }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
