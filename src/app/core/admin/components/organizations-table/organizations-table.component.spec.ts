import { MockRestService } from './../../../../shared/services/network/rest.service.mock';
import { RestService } from './../../../../shared/services/network/rest.service';
import { Observable } from 'rxjs/Rx';
import { CoreModule } from './../../../core.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { OrganizationsTableComponent } from './organizations-table.component';
import { Injectable } from '@angular/core';

@Injectable()
class UrlsProvider {
    onGet(uri: string) {
        switch (uri) {
            default:
                return [];
        }
    }
}

describe('OrganizationsTableComponent', () => {
    let component: OrganizationsTableComponent;
    let fixture: ComponentFixture<OrganizationsTableComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [CoreModule],
            providers: [
                UrlsProvider,
                { provide: RestService, useClass: MockRestService, deps: [UrlsProvider] },]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(OrganizationsTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
