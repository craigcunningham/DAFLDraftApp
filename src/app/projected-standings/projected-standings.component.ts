import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource, Sort } from '@angular/material';
import { HitterStats } from '../models/HitterStats';
import { PitchingStats } from '../models/PitchingStats';
import { ProjectionsService } from '../projections.service';

@Component({
  selector: 'app-projected-standings',
  templateUrl: './projected-standings.component.html',
  styleUrls: ['./projected-standings.component.css']
})
export class ProjectedStandingsComponent implements OnInit {
  hitterStats: MatTableDataSource<HitterStats>;
  displayedHittingColumns: string[] = ['name', 'avg', 'hr', 'rbi', 'runs', 'sb'];
  // @ViewChild(MatSort) hittingSort: MatSort;
  pitchingStats: MatTableDataSource<PitchingStats>;
  displayedPitchingColumns: string[] = ['name', 'era', 'wins', 'so', 'saves', 'holds'];
  // @ViewChild('pitchingTable') pitchingSort: MatSort;

  @ViewChild('hitterTable', { read: MatSort }) hittingSort: MatSort;
  @ViewChild('pitchingTable', { read: MatSort }) pitchingSort: MatSort;

  constructor(private projectionService: ProjectionsService, private _liveAnnouncer: LiveAnnouncer) { }

  ngOnInit() {
    this.projectionService.GetTeamHitterProjections('Steamer').subscribe(stats => this.SetUpHitting(stats));
    this.projectionService.GetTeamPitcherProjections('Steamer').subscribe(stats => this.SetUpPitching(stats));
  }
  SetUpHitting(stats: HitterStats[]) {
    console.log('projected-standings->SetUpStuff', stats);
    this.hitterStats = new MatTableDataSource<HitterStats>(stats);
    this.hitterStats.sort = this.hittingSort;
  }
  SetUpPitching(stats: PitchingStats[]) {
    console.log('projected-standings->PitchingStats', stats);
    this.pitchingStats = new MatTableDataSource<PitchingStats>(stats);
    this.pitchingStats.sort = this.pitchingSort;
  }
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
