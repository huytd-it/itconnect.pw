import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkExperienceModalComponent } from './work-experience-modal.component';

describe('WorkExperienceModalComponent', () => {
  let component: WorkExperienceModalComponent;
  let fixture: ComponentFixture<WorkExperienceModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkExperienceModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkExperienceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
