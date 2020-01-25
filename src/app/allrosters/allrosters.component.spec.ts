import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllrostersComponent } from './allrosters.component';

describe('AllrostersComponent', () => {
  let component: AllrostersComponent;
  let fixture: ComponentFixture<AllrostersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllrostersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllrostersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
