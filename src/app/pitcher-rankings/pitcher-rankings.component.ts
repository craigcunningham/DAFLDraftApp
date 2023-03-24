import { Component, OnInit, ViewChild, AfterViewInit, QueryList, ViewChildren } from '@angular/core';
import { HitterRanking, PitcherRanking } from '../ranking';
import { PlayerService } from '../player.service';
import { PositionalRanking } from '../positional-ranking';

import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-pitcher-rankings',
  templateUrl: './pitcher-rankings.component.html',
  styleUrls: ['./pitcher-rankings.component.css']
})
export class PitcherRankingsComponent implements OnInit, AfterViewInit {
  pitcherRanking: MatTableDataSource<any>;
  // tslint:disable-next-line:max-line-length
  displayedColumns: string[] = ['#', 'fg', 'cbs', 'playerName', 'adp', 'adjusted', 'guess', 'salary', 'ip', 'era', 'w', 'so', 'sv', 'holds'];
  positionList = ['SP', 'RP'];
  ranking: PitcherRanking[];
  pos: string;
  selectedSystem: string;

  constructor(private playerService: PlayerService, private _liveAnnouncer: LiveAnnouncer) { }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChildren('pitcherRank') sorts: QueryList<MatSort>;

  ngOnInit(): void {
    this.getRankings('Steamer');
  }
  ngAfterViewInit() {
  }

  systemSelected(system: any) {
    this.getRankings(system.currentTarget.value);
  }
  positionSelected(position: any) {
    const selectedPosition = position.currentTarget.value;
    this.pitcherRanking.filter = selectedPosition.trim().toLowerCase();
  }
  getRankings(system: string) {
    this.playerService.GetPitcherRankings(system).subscribe(p => this.SetUpStuff(p));
  }
  SetUpStuff(r: PitcherRanking[]) {
    this.ranking = r;
    this.pitcherRanking = new MatTableDataSource(this.ranking);
    this.pitcherRanking.sort = this.sort;
    this.pitcherRanking.filterPredicate = function (record, filter) {
      if (filter === 'all') {
        return record.ip >= 0;
      } else if (filter === 'rp') {
          return record.sv > 0 || record.hld > 0;
      } else {
        return record.sv === 0 || record.hld === 0;
      }
    };
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
