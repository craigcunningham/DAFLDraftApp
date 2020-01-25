import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasedPlayersComponent } from './purchased-players.component';

describe('PurchasedPlayersComponent', () => {
  let component: PurchasedPlayersComponent;
  let fixture: ComponentFixture<PurchasedPlayersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchasedPlayersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasedPlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
