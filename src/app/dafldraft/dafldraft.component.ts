import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material';

import { Player } from '../player';
import { PlayerService } from '../player.service';
import { FormControl } from '@angular/forms';
import { MessageService } from '../message.service';
import { Team } from '../team';
import { Position } from '../position';
import { RosterAddition } from '../rosterAddition';
import { TeamService } from '../team.service';
import { PositionService } from '../position.service';
import { RosterService } from '../roster.service';
import { RosterCounts } from '../rosterCounts';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-dafldraft',
  templateUrl: './dafldraft.component.html',
  styleUrls: ['./dafldraft.component.css']
})
export class DafldraftComponent implements OnInit {
  teams: Team[];
  positionsForPlayer: Position[];
  allPositions: Position[];
  player: number;
  position: string;
  team: number;
  salary: number;
  contractYear: number;
  currentPlayerName: string;
  recentAdditions: Array<RosterAddition>;
  selectedTeam: Team;
  placeHolder = 'Player to Add';
  @ViewChild('rosterapp') rosterapp: any;
  @ViewChild('rosterCount') rosterCount: any;

  constructor(private teamService: TeamService,
              private positionService: PositionService,
              private rosterService: RosterService) { }

  ngOnInit() {
    this.teamService.getTeams()
    .subscribe(teams => this.teams = teams);

    this.rosterService.GetTenMostRecentAdditions()
    .subscribe(adds => this.SetAdditions(adds));

    this.positionService.getPositions().subscribe(p => this.preparePositionArray(p));
  }

  preparePositionArray(positions: any) {
    const positionArray = new Array();
    positions.forEach(function(p) {
      positionArray.push(p.position);
    });
    // let p = positionArray.
    this.SetPositionDropDown(positionArray);
  }

  SetAdditions(adds: RosterAddition[]) {
    this.recentAdditions = adds.reverse();
  }

  playerSelected(player: any) {
    this.player = player.player_id;
    this.currentPlayerName = player.name;
    this.contractYear = 1;
    this.salary = 1;
    const arrayOfPositions = 'B'.split('|');
    if (player.eligible_positions != null) {
      player.eligible_positions.split('|').forEach((pos: string) => arrayOfPositions.push(pos));
    } else {
      if (player.position === 'H') {
        arrayOfPositions.push('UT');
      } else {
        arrayOfPositions.push('P');
      }
    }
    this.SetPositionDropDown(arrayOfPositions);
  }

  teamSelected(team: number) {
    this.selectedTeam = this.teams.find(t => t.id === Number(this.team));
  }

  SetPositionDropDown(arrayOfPositions) {
    // let arrayOfPositions = positions.split(',');
    // arrayOfPositions.push('B');
    this.positionsForPlayer = arrayOfPositions;
    this.position = arrayOfPositions[0];
  }

  AddPurchaseToRecentAdditions(id: number, playerName: string, position: string, teamName: string, salary: number) {
    let newRosterAddition: RosterAddition;
    newRosterAddition = new RosterAddition();
    newRosterAddition.playerName = playerName;
    newRosterAddition.teamName = teamName;
    newRosterAddition.salary = salary;
    newRosterAddition.id = id;

    if (this.recentAdditions.length === 10) {
      this.recentAdditions = this.recentAdditions.slice(1, 10);
    }
    this.recentAdditions.push(newRosterAddition);
  }

  save(event: any, playerSelecter, positionDropDown) {
    const dateAdded: Date = new Date(2019, 3, 1);
    this.rosterService.addPlayerToTeam(this.player, this.position, this.team, this.salary, this.contractYear, dateAdded)
    .subscribe(r => this.UpdatePage(r));
//      .subscribe(r => this.AddPurchaseToRecentAdditions(r.id,
//        this.currentPlayerName,
//        r.position,
//        this.selectedTeam.name,
//        r.salary));
  playerSelecter.clear();
}
  UpdatePage(r) {
    this.AddPurchaseToRecentAdditions(r.id,
      this.currentPlayerName,
      r.position,
      this.selectedTeam.name,
      r.salary);
      this.rosterCount.loadData();
      this.SetPositionDropDown(this.allPositions);
    }
}
