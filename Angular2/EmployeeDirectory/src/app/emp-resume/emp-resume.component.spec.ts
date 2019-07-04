import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpResumeComponent } from './emp-resume.component';

describe('EmpResumeComponent', () => {
  let component: EmpResumeComponent;
  let fixture: ComponentFixture<EmpResumeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpResumeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
