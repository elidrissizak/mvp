import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CoreIconsComponent } from 'app/core/shared/components/core-icons/core-icons.component';


describe('CoreIconsComponent', () => {
  let component: CoreIconsComponent;
  let fixture: ComponentFixture<CoreIconsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [CoreIconsComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoreIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
