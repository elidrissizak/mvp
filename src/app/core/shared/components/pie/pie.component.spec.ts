import { ColorService } from './../../services/color.service';
import { CoreSharedModule } from './../../core-shared.module';
import { PieComponent } from './pie.component';
import { ComponentFixture, TestBed, async, getTestBed } from '@angular/core/testing';
import { Injector } from "@angular/core/src/di";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

describe('PieComponent', () => {

    let component: PieComponent;
    let fixture: ComponentFixture<PieComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PieComponent],
            providers: [ColorService]
        });
        fixture = TestBed.createComponent(PieComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

    }));

    it('should exist', async(() => {
        expect(PieComponent).toBeDefined();
        expect(component).toBeDefined();
    }));
}); 
