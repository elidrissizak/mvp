import { Router } from '@angular/router';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CoreSideComponent } from 'app/core/core-side.component';
import { IconComponent } from 'app/shared/components/icon/icon.component';
import { SectionService } from 'app/core/shared/services/section.service';


describe('CoreSideComponent', () => {
  let component: CoreSideComponent;
  let fixture: ComponentFixture<CoreSideComponent>;

  let router = {
    navigate: jasmine.createSpy('navigate'),
    url: '/core/dashboard',
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [CoreSideComponent, IconComponent],
      providers: [
        SectionService,
        { provide: Router, useValue: router },
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoreSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
