import { CoreErrorComponent } from './core-error.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';


describe('CoreErrorComponent', () => {
    let component: CoreErrorComponent;
    let fixture: ComponentFixture<CoreErrorComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            declarations: [CoreErrorComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CoreErrorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
