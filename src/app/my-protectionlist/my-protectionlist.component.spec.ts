import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProtectionlistComponent } from './my-protectionlist.component';

describe('MyProtectionlistComponent', () => {
  let component: MyProtectionlistComponent;
  let fixture: ComponentFixture<MyProtectionlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyProtectionlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyProtectionlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
