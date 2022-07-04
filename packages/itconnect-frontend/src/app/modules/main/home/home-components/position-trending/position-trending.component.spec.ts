import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionTrendingComponent } from './position-trending.component';

describe('PositionTrendingComponent', () => {
  let component: PositionTrendingComponent;
  let fixture: ComponentFixture<PositionTrendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PositionTrendingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PositionTrendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
