import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PitcherRankingsComponent } from './pitcher-rankings.component';

describe('PitcherRankingsComponent', () => {
  let component: PitcherRankingsComponent;
  let fixture: ComponentFixture<PitcherRankingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PitcherRankingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PitcherRankingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
