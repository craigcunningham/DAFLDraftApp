import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectedStandingsComponent } from './projected-standings.component';

describe('ProjectedStandingsComponent', () => {
  let component: ProjectedStandingsComponent;
  let fixture: ComponentFixture<ProjectedStandingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectedStandingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectedStandingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
