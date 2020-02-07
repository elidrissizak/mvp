import { MockRestService } from '../shared/services/network/rest.service.mock';
import { RestService } from '../shared/services/network/rest.service';
import { Injectable } from '@angular/core';
import { TaskService } from '../shared/services/task/task.service';
import { SessionService } from '../shared/services/session/session.service';
import { MockSessionService } from '../shared/services/session/session.service.mock';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CoreHeaderComponent } from 'app/core/core-header.component';
import { IconComponent } from 'app/shared/components/icon/icon.component';
import { LanguageService } from 'app/shared/services/language/language.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Injectable()
class UrlsProvider {
  onGet() {
    return [];
  }
}

describe('CoreHeaderComponent', () => {
  let component: CoreHeaderComponent;
  let fixture: ComponentFixture<CoreHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      declarations: [CoreHeaderComponent, IconComponent],
      providers: [
        TaskService,
        LanguageService,
        TranslateService,
        UrlsProvider,
        { provide: SessionService, useClass: MockSessionService },
        { provide: RestService, useClass: MockRestService, deps: [UrlsProvider] }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoreHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
