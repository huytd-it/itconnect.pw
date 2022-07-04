import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillTrendingComponent } from './skill-trending.component';

describe('SkillTrendingComponent', () => {
  let component: SkillTrendingComponent;
  let fixture: ComponentFixture<SkillTrendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkillTrendingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillTrendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
