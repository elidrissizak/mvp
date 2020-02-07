import { Observable } from 'rxjs/Rx';
import { UserService } from '../../../../shared/services/user/user.service';
import { TaskService } from '../../../../shared/services/task/task.service';
import { RouterStub } from '../../../../testing/router-stubs';
import { Router } from '@angular/router';
import { MockRestService } from '../../../../shared/services/network/rest.service.mock';
import { RestService } from '../../../../shared/services/network/rest.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SharedModule } from 'app/shared/shared.module';
import { Injectable, NO_ERRORS_SCHEMA } from '@angular/core';
import { User } from 'app/shared/entities/user/user.entity';
import { MOCK_CONSTANTS } from 'app/mocks.constants';
import { UsersListComponent } from 'app/core/admin/components/users-list/users-list.component';

@Injectable()
class UrlsProvider {
  onGet() {
    return [];
  }
}

class MockUserService extends UserService {
  getUsers() {
    return Observable.of([]);
  }
}
class MockTaskService extends TaskService { }

describe('UserListComponent', () => {
  let component: UsersListComponent;
  let fixture: ComponentFixture<UsersListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule
      ],
      declarations: [UsersListComponent],
      providers: [
        UrlsProvider,
        { provide: UserService, useClass: MockUserService },
        { provide: TaskService, useClass: MockTaskService },
        { provide: RestService, useClass: MockRestService, deps: [UrlsProvider] },
        { provide: Router, useClass: RouterStub }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
