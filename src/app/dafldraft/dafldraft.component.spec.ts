import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DafldraftComponent } from './dafldraft.component';

describe('DafldraftComponent', () => {
  let component: DafldraftComponent;
  let fixture: ComponentFixture<DafldraftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DafldraftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DafldraftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
