// import { TaskService } from '../../../../shared/services/task/task.service';
// import { MockRestService } from '../../../../shared/services/network/rest.service.mock';
// import { RestService } from '../../../../shared/services/network/rest.service';
// import { Injectable } from '@angular/core';
// import { IconComponent } from '../../../../shared/components/icon/icon.component';
// import { AccordionModule } from 'ngx-bootstrap/ng2-bootstrap';
// import { ButtonModalComponent } from '../../../shared/components/button-modal/button-modal.component';
// import { SuggestionsComponent } from './suggestions.component';
// import { TranslateService, TranslateModule } from '@ngx-translate/core';
// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { SuggestionsGlobalComponent } from 'app/core/bim-assistant/components/suggestions-global/suggestions-global.component';
// import { CoreSharedModule } from 'app/core/shared/core-shared.module';
// import { SharedModule } from 'app/shared/shared.module';
// import { TooltipModule } from 'ngx-bootstrap/tooltip/tooltip.module';
// import { } from 'app/core/bim-assistant/services/history.service';

// @Injectable()
// class UrlsProvider {
//   onGet() {
//     return [];
//   }
// }
// // Not working
// describe('SuggestionsComponent', () => {
//   let component: SuggestionsComponent;
//   let fixture: ComponentFixture<SuggestionsComponent>;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [
//         TranslateModule.forRoot(),
//         AccordionModule,
//         CoreSharedModule,
//         SharedModule,
//         TooltipModule
//       ],
//       declarations: [
//         SuggestionsComponent,
//         SuggestionsGlobalComponent
//       ],
//       providers: [
//         TranslateService,
//         TaskService,
//         UrlsProvider,
//         { provide: RestService, useClass: MockRestService, deps: [UrlsProvider] }
//       ]
//     }).compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(SuggestionsComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
