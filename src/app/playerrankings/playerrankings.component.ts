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
  positionalRanking = {} as PositionalRanking;
  positionalRanking2: MatTableDataSource<any>;
  position: [];
  displayedColumns: string[] = ['playerName', 'adp', 'eligible', 'ab', 'avg', 'hr', 'rbi', 'r', 'sb'];
  positionList = ['C', '1B', '2B', '3B', 'SS', 'OF'];
  pitcherRanking: PitcherRanking[];
  pos: string;
  selectedSystem: string;

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
    const selectedPosition = position.currentTarget.value;
    this.positionalRanking2.filter = selectedPosition.trim().toLowerCase();
  }
  getRankings(system: string) {
    this.playerService.GetPitcherRankings(system).subscribe(p => this.pitcherRanking = p);
    this.playerService.GetHitterRankings(system).subscribe(r => this.SetUpStuff(r));
  }
  SetUpStuff(r: HitterRanking[]) {
    this.rankings = r;
    this.positionalRanking2 = new MatTableDataSource(this.rankings);
    this.positionalRanking2.sort = this.sort;
    this.positionalRanking2.filterPredicate = function (record, filter) {
      if (filter === 'all') {
        return record.eligible.length >= 0;
      } else {
        return record.eligible.toLocaleLowerCase().search(filter.toLocaleLowerCase()) >= 0;
      }
    };
  }

  announceSortChange(sortState: Sort) {
    // console.log('announceSortChange', sortState);
    // console.log('announceSortChange', this.CatcherRanking);
    // console.log('announceSortChange', this.CatcherRanking.sortData);
    // this.CatcherRanking.sortData = sortState;
    // this.CatcherRanking.sort();
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

}
