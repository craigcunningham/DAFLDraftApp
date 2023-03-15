import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerTransactionsComponent } from './player-transactions.component';

describe('PlayerTransactionsComponent', () => {
  let component: PlayerTransactionsComponent;
  let fixture: ComponentFixture<PlayerTransactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerTransactionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
