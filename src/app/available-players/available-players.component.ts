import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Player } from '../player';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-available-players',
  templateUrl: './available-players.component.html',
  styleUrls: ['./available-players.component.css']
})
export class AvailablePlayersComponent implements OnInit {
  players: Player[];
  positionalRanking: MatTableDataSource<any>;
  displayedColumns: string[] = ['#', 'fg', 'cbs', 'playerName', 'adp', 'eligible'];
  positionList = ['C', '1B', '2B', '3B', 'SS', 'OF', 'UT', 'SP', 'RP'];
  pos: string;
  selectedSystem: string;
  selectedPosition = 'All Players';

  constructor(private playerService: PlayerService) { }

  ngOnInit() {
    this.getRankings();
  }
  positionSelected(position: any) {
    this.selectedPosition = position.currentTarget.value;
    this.positionalRanking.filter = this.selectedPosition.trim().toLowerCase();
  }
  getRankings() {
    this.playerService.GetPlayersByAdp().subscribe(p => this.SetUpStuff(p));
  }
  SetUpStuff(p: Player[]) {
    console.log('a-p:SetupStuff', p);
    this.players = p;
    this.positionalRanking = new MatTableDataSource(this.players);
    this.positionalRanking.filterPredicate = function (record, filter) {
      if (filter === 'all players') {
        return record.eligible_positions.length >= 0;
      } else if (filter === 'all hitters') {
        return record.eligible_positions.indexOf('U') >= 0;
      } else if (filter === 'all pitchers') {
        return record.eligible_positions.indexOf('P') >= 0;
      } else {
        return record.eligible_positions.toLocaleLowerCase().search(filter.toLocaleLowerCase()) >= 0;
      }
    };
  }
}
