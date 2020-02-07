// import { MockRestService } from '../../../../shared/services/network/rest.service.mock';
// import { RestService } from '../../../../shared/services/network/rest.service';
// import { ActivatedRoute, Router } from '@angular/router';
// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { TranslateModule, TranslateService } from '@ngx-translate/core';
// import { SharedModule } from 'app/shared/shared.module';
// import { Injectable, NO_ERRORS_SCHEMA } from '@angular/core';
// import { User } from 'app/shared/entities/user/user.entity';
// import { MOCK_CONSTANTS } from 'app/mocks.constants';
// import { UserFormComponent } from 'app/core/admin/components/user-form/user-form.component';
// import { CoreRoutingModule } from 'app/core/core-routing.module';
// import { ActivatedRouteStub, RouterStub } from 'app/testing/router-stubs';
// import { UserService } from 'app/shared/services/user/user.service';
// import { TaskService } from 'app/shared/services/task/task.service';

// @Injectable()
// class UrlsProvider {
//   onGet() {
//     return [];
//   }
// }

// describe('UserCardComponent', () => {
//   let component: UserFormComponent;
//   let fixture: ComponentFixture<UserFormComponent>;

//   let activatedRoute;

//   beforeEach(() => {
//     let userServiceStub = class UserServiceStub extends UserService { };
//     let taskServiceStub = class taskServiceStub extends TaskService { };

//     activatedRoute = new ActivatedRouteStub();

//     TestBed.configureTestingModule({
//       imports: [
//         SharedModule,
//       ],
//       declarations: [UserFormComponent],
//       providers: [
//         { provide: Router, useClass: RouterStub },
//         { provide: ActivatedRoute, useClass: ActivatedRouteStub },
//         { provide: UserService, useClass: userServiceStub },
//         { provide: TaskService, useClass: taskServiceStub },
//         UrlsProvider,
//         { provide: RestService, useClass: MockRestService, deps: [UrlsProvider] },

//       ],
//       schemas: [NO_ERRORS_SCHEMA]
//     })
//       .compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(UserFormComponent);
//     component = fixture.componentInstance;
//     activatedRoute.testParamMap = {};
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
