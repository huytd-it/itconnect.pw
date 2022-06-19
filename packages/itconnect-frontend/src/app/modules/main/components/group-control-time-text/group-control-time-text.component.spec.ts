import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupControlTimeTextComponent } from './group-control-time-text.component';

describe('GroupControlTimeTextComponent', () => {
  let component: GroupControlTimeTextComponent;
  let fixture: ComponentFixture<GroupControlTimeTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupControlTimeTextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupControlTimeTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
