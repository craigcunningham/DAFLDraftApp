import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Team } from '../team';
import { Player } from '../player';
import { Position } from '../position';
import { TeamService } from '../team.service';
import { RosterService } from '../roster.service'
import { TeamRoster } from '../teamroster';
import { PlayerService } from '../player.service';
import { PositionService } from '../position.service';

@Component({
  selector: 'app-roster',
  templateUrl: './roster.component.html',
  styleUrls: ['./roster.component.css']
})
export class RosterComponent implements OnInit {
  @Input() teamid: number;
  team: Team;
  teamRoster: TeamRoster = new TeamRoster();

  constructor(
    private route: ActivatedRoute,
    private playerService: PlayerService,
    private teamService: TeamService,
    private rosterService: RosterService,
    private positionService: PositionService) { }

  SetPlayer(players: Player[], position: string) {
    players.forEach(player => {
      this.positionService.getPositionsForPlayer(player.id)
      .subscribe(positions => player.eligiblePositions = positions);

      //this.playerService.GetSalary(player.id)
      //.subscribe(salary => player.salary = salary)
    });

    switch(position) {
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

loadData(teamid: number) {
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
    const id = +this.route.snapshot.paramMap.get('id');
    this.teamid = id;
    this.loadData(this.teamid);
  }

  GetSalary(playerid: number) {
    this.teamService.getTeams()
    .subscribe(teams => this.team = teams.find(team => team.id === this.teamid));
  }

  MovePlayer(playerid: number, position: Position) {
    this.rosterService.MovePlayer(playerid, position);
  }
}
