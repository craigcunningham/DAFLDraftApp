import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Team } from '../team';
import { Player } from '../player';
import { Position } from '../position';
import { TeamService } from '../team.service';
import { RosterService } from '../roster.service';
import { TeamRoster } from '../teamroster';
import { PlayerService } from '../player.service';
import { PositionService } from '../position.service';
import { MessageService } from '../message.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-roster',
  templateUrl: './roster.component.html',
  styleUrls: ['./roster.component.css']
})
export class RosterComponent implements OnInit {
  @Input() teamid: number;
  team: Team;
  teamRoster: TeamRoster = new TeamRoster();

  positionsForPlayer: Position[];
  player: number;
  position: string;
  salary: number;
  contractYear: number;
  placeHolder = 'Player to Add';
  private _TotalSalary: number;
  private _PlayerCount: number;
  MoneyLeft: number;
  MaxBid: number;
  // allPositions: Position[];
  // currentPlayerName: string;
  // selectedTeam: Team;


  constructor(
    private route: ActivatedRoute,
    private playerService: PlayerService,
    private teamService: TeamService,
    private rosterService: RosterService,
    private messageService: MessageService,
    private positionService: PositionService) { }

  SetPlayer(players: Player[], position: string) {
    players.forEach(player => {
      player.eligiblePositions = player.eligible_positions.split('|');
      player.eligiblePositions.push('B');
      this.PlayerCount += 1;
      this.TotalSalary += player.salary;
    });

    switch (position) {
      case 'C': {
        this.teamRoster.C = players[0];
        break;
      }
      case '1B': {
        this.teamRoster.First = players[0];
        break;
      }
      case '2B': {
        this.teamRoster.Second = players[0];
        break;
      }
      case '3B': {
        this.teamRoster.Third = players[0];
        break;
      }
      case 'SS': {
        this.teamRoster.SS = players[0];
        break;
      }
      case 'UT': {
        this.teamRoster.UT = players[0];
        break;
      }
      case 'OF': {
        this.teamRoster.OF = players;
        break;
      }
      case 'P': {
        this.teamRoster.P = players;
        break;
      }
      case 'B': {
        this.teamRoster.B = players;
        break;
      }
    }
  }
  set PlayerCount(value: number) {
    if (value !== this._PlayerCount) {
        this._PlayerCount = value;
        // this.doSomething();
    }
  }
  get PlayerCount(): number {
    return this._PlayerCount;
  }
  set TotalSalary(value: number) {
    if (value !== this._TotalSalary) {
        this._TotalSalary = value;
        this.CalculateMaxBidAndMoneyLeft();
    }
  }
  get TotalSalary(): number {
    return this._TotalSalary;
  }
  CalculateMaxBidAndMoneyLeft() {
    this.MoneyLeft = 260 - this.TotalSalary;
    this.MaxBid = this.MoneyLeft - (25 - this.PlayerCount) + 1;
  }
  playerSelected(player: any) {
    this.contractYear = 1;
    this.salary = 1;
    this.player = player.player_id;

    let arrayOfPositions = 'B'.split('|');
    if (player.eligible_positions != null) {
      let arrayOfPositions = player.eligible_positions.split('|');
    } else {
      if (player.position === 'H') {
        arrayOfPositions.push('UT');
      } else {
        arrayOfPositions.push('P');
      }
    }
    this.SetPositionDropDown(arrayOfPositions);
  }
  SetPositionDropDown(arrayOfPositions) {
    this.positionsForPlayer = arrayOfPositions;
    this.position = arrayOfPositions[0];
  }

  /*
  playerSelected2(player: any) {
    this.contractYear = 1;
    this.salary = 1;
    this.player = player.player_id;
    if (player.eligible_positions == null) {
      this.arrayOfPositions.push('UT');
    } else {
      this.arrayOfPositions = player.eligible_positions.split('|');
    }
    this.arrayOfPositions.push('B');
    this.SetPositionDropDown2();
  }

  SetPositionDropDown2() {
    this.positionsForPlayer = this.arrayOfPositions;
    this.position = this.arrayOfPositions[0];
  }
  */
  save(event: any, playerSelecter, positionDropDown) {
    const dateAdded: Date = new Date(2019, 3, 1);
    this.rosterService.addPlayerToTeam(this.player, this.position, this.team.id, this.salary, this.contractYear, dateAdded)
    .subscribe(r => this.loadData(this.team.id));
    playerSelecter.clear();
  }

  loadData(teamid: number) {
    this.TotalSalary = 0;
    this.PlayerCount = 0;
    this.MaxBid = 0;
    this.MoneyLeft = 0;

    this.teamid = teamid;
    this.playerService.getPlayersAtPostionForTeam(this.teamid, 'C')
    .subscribe(player => this.SetPlayer(player, 'C'));
    this.playerService.getPlayersAtPostionForTeam(this.teamid, '1B')
    .subscribe(player => this.SetPlayer(player, '1B'));
    this.playerService.getPlayersAtPostionForTeam(this.teamid, '2B')
    .subscribe(player => this.SetPlayer(player, '2B'));
    this.playerService.getPlayersAtPostionForTeam(this.teamid, '3B')
    .subscribe(player => this.SetPlayer(player, '3B'));
    this.playerService.getPlayersAtPostionForTeam(this.teamid, 'SS')
    .subscribe(player => this.SetPlayer(player, 'SS'));
    this.playerService.getPlayersAtPostionForTeam(this.teamid, 'UT')
    .subscribe(player => this.SetPlayer(player, 'UT'));
    this.playerService.getPlayersAtPostionForTeam(this.teamid, 'OF')
    .subscribe(players => this.SetPlayer(players, 'OF'));
    this.playerService.getPlayersAtPostionForTeam(this.teamid, 'P')
    .subscribe(players => this.SetPlayer(players, 'P'));
    this.playerService.getPlayersAtPostionForTeam(this.teamid, 'B')
    .subscribe(players => this.SetPlayer(players, 'B'));

    this.teamService.getTeams()
    .subscribe(teams => this.team = teams.find(team => team.id === this.teamid));
  }
  ngOnInit() {
    let id = 0;
    if (+this.route.snapshot.paramMap.get('id')) {
      id = +this.route.snapshot.paramMap.get('id');
    } else {
      id = 10;
    }
    this.teamid = id;
    this.loadData(this.teamid);
  }

  GetSalary(playerid: number) {
    this.teamService.getTeams()
    .subscribe(teams => this.team = teams.find(team => team.id === this.teamid));
  }

  MovePlayer(playerid: number, position: string) {
    console.log(`Move player ${playerid} to ${position}`);
    if (position === 'U') {
      position = 'UT';
    }
    this.rosterService.MovePlayer(playerid, position).subscribe(r => this.loadData(this.teamid));
  }
  private log(message: string) {
    this.messageService.add(`roster.component.ts: ${message}`);
  }
}
