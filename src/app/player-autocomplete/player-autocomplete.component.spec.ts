import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerAutocompleteComponent } from './player-autocomplete.component';

describe('PlayerAutocompleteComponent', () => {
  let component: PlayerAutocompleteComponent;
  let fixture: ComponentFixture<PlayerAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
