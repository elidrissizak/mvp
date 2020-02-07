import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule, Router } from '@angular/router';
import { CoreModule } from './../../../core.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationsTabComponent } from './organizations-tab.component';

describe('OrganizationsTabComponent', () => {
    let component: OrganizationsTabComponent;
    let fixture: ComponentFixture<OrganizationsTabComponent>;

    let router = {
        navigate: jasmine.createSpy('navigate')
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                CoreModule,
                RouterTestingModule.withRoutes([]),
            ],
            providers: [{ provide: Router, useValue: router }]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(OrganizationsTabComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create and navigate to organizations-list', () => {
        expect(component).toBeTruthy();
        expect(router.navigate).toHaveBeenCalledWith([
            '/core/admin/',
            { outlets: { organizationsTab: ['organizations-list'] } }
        ]);
    });
});
