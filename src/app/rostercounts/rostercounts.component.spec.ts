import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RostercountsComponent } from './rostercounts.component';

describe('RostercountsComponent', () => {
  let component: RostercountsComponent;
  let fixture: ComponentFixture<RostercountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RostercountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RostercountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
