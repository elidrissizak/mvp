import { LanguageService } from '../../../../shared/services/language/language.service';
import { TypeaheadModule } from 'ngx-bootstrap/ng2-bootstrap';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable, NO_ERRORS_SCHEMA } from '@angular/core';

import { GsfasComponent } from './gsfas.component';
import { CoreSharedModule } from 'app/core/shared/core-shared.module';
import { SharedModule } from 'app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { TaskService } from 'app/shared/services/task/task.service';
import { GsfaService } from 'app/core/shared/services/gsfa.service';
import { Observable } from 'rxjs/Observable';
import { GsfaInputComponent } from 'app/core/admin/components/gsfa-input/gsfa-input.component';
import { FormsModule } from '@angular/forms';
import { RestService } from 'app/shared/services/network/rest.service';
import { MockRestService } from 'app/shared/services/network/rest.service.mock';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

export interface Gsfa {
  id: number;
  frenchLabel: string;
  englishLabel: string;
}

@Injectable()
class UrlsProvider {
  onGet() {
    return [];
  }
}

class MockGsfaService extends GsfaService {
  getGsfas(): Observable<Gsfa[]> {
    return Observable.of([
      { id: 1, frenchLabel: 'fr_1', englishLabel: 'en_1' },
      { id: 1, frenchLabel: 'fr_2', englishLabel: 'en_2' },
      { id: 1, frenchLabel: 'fr_3', englishLabel: 'en_3' },
      { id: 1, frenchLabel: 'fr_4', englishLabel: 'en_4' }
    ]);
  }
}

class MockTaskService extends TaskService {
}

describe('GsfasComponent', () => {
  let component: GsfasComponent;
  let fixture: ComponentFixture<GsfasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        TypeaheadModule.forRoot(),
        TranslateModule.forRoot()
      ],
      declarations: [GsfasComponent, GsfaInputComponent],
      providers: [
        { provide: GsfaService, useClass: MockGsfaService },
        { provide: TaskService, useClass: MockTaskService },
        UrlsProvider,
        { provide: RestService, useClass: MockRestService, deps: [UrlsProvider] },
        LanguageService,
        TranslateService
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GsfasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

