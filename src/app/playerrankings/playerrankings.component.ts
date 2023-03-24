import { Component, OnInit, ViewChild, AfterViewInit, QueryList, ViewChildren } from '@angular/core';
import { HitterRanking, PitcherRanking } from '../ranking';
import { PlayerService } from '../player.service';
import { PositionalRanking } from '../positional-ranking';

import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-playerrankings',
  templateUrl: './playerrankings.component.html',
  styleUrls: ['./playerrankings.component.css']
})

export class PlayerrankingsComponent implements OnInit, AfterViewInit {
  rankings: HitterRanking[];
  positionalRanking: MatTableDataSource<any>;
  position: [];
  // tslint:disable-next-line:max-line-length
  displayedColumns: string[] = ['#', 'fg', 'cbs', 'playerName', 'adjusted', 'guess', 'salary', 'adp', 'eligible', 'ab', 'avg', 'hr', 'rbi', 'r', 'sb'];
  positionList = ['C', '1B', '2B', '3B', 'SS', 'OF'];
  pos: string;
  selectedSystem: string;
  selectedPosition = 'All Hitters';

  constructor(private playerService: PlayerService, private _liveAnnouncer: LiveAnnouncer) { }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChildren('positionalRank') sorts: QueryList<MatSort>;

  ngOnInit(): void {
    this.getRankings('Steamer');
  }
  ngAfterViewInit() {
  }

  systemSelected(system: any) {
    this.getRankings(system.currentTarget.value);
  }
  positionSelected(position: any) {
    this.selectedPosition = position.currentTarget.value;
    this.positionalRanking.filter = this.selectedPosition.trim().toLowerCase();
  }
  getRankings(system: string) {
    this.playerService.GetHitterRankings(system).subscribe(r => this.SetUpStuff(r));
  }
  SetUpStuff(r: HitterRanking[]) {
    this.rankings = r;
    this.positionalRanking = new MatTableDataSource(this.rankings);
    this.positionalRanking.sort = this.sort;
    this.positionalRanking.filterPredicate = function (record, filter) {
      if (filter === 'all hitters') {
        return record.eligible.length >= 0;
      } else {
        return record.eligible.toLocaleLowerCase().search(filter.toLocaleLowerCase()) >= 0;
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
