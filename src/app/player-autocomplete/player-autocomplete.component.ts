import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material';

import { Player } from '../player';
import { PlayerService } from '../player.service';
import { FormControl } from '@angular/forms';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-player-autocomplete',
  templateUrl: './player-autocomplete.component.html',
  styleUrls: ['./player-autocomplete.component.css']
})
export class PlayerAutocompleteComponent implements OnInit {
  @Input() placeHolder: string;
  @Output() playerSelected = new EventEmitter<Player>();
  @ViewChild('searchBox', { static: true }) searchBox: ElementRef;

  players$: Observable<Player[]>;
  private searchTerms = new Subject<String>();
  playerControl: FormControl = new FormControl();

  constructor(private playerService: PlayerService, private messageService: MessageService) { }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  displayFn(owner?: Player): string | undefined {
    return owner ? owner.name : undefined;
  }

  onSelectionChanged(event: MatAutocompleteSelectedEvent) {
//    this.messageService.add(`option selected: ${event.option.value.name}`);
    this.playerSelected.emit(event.option.value);
  }

  clear() {
    this.playerControl.setValue(null);
    this.searchBox.nativeElement.focus();
  }

  ngOnInit() {
    this.players$ = this.searchTerms.pipe(
      debounceTime(100),
      distinctUntilChanged(),
      switchMap((term: string) => this.playerService.searchPlayers(term))
    );
  }
}

