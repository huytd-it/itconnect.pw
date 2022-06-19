import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupControlTimeTextModalComponent } from './group-control-time-text-modal.component';

describe('GroupControlTimeTextModalComponent', () => {
  let component: GroupControlTimeTextModalComponent;
  let fixture: ComponentFixture<GroupControlTimeTextModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupControlTimeTextModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupControlTimeTextModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
