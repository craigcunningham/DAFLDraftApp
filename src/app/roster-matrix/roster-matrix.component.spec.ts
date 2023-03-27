import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RosterMatrixComponent } from './roster-matrix.component';

describe('RosterMatrixComponent', () => {
  let component: RosterMatrixComponent;
  let fixture: ComponentFixture<RosterMatrixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RosterMatrixComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RosterMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
