import { Component, OnInit } from '@angular/core';
import { HitterMatrix, PitcherMatrix } from '../models/Matrix';
import { RosterService } from '../roster.service';

@Component({
  selector: 'app-roster-matrix',
  templateUrl: './roster-matrix.component.html',
  styleUrls: ['./roster-matrix.component.css']
})
export class RosterMatrixComponent implements OnInit {
  hitterMatrix: HitterMatrix[];
  pitcherMatrix: PitcherMatrix[];
  displayedHittingPositions: string[] = ['name', 'catcher', 'first', 'second', 'third', 'shortstop', 'ut', 'of1', 'of2', 'of3'];
  displayedPitchingPositions: string[] = ['name', 'p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8'];
  hitterMatrixTransposed: any;

  constructor(private rosterService: RosterService) { }

  ngOnInit() {
    this.rosterService.getRosterHitterMatrix().subscribe(m => this.SetupStuff(m));
    this.rosterService.getRosterPitcherMatrix().subscribe(m => this.pitcherMatrix = m);
  }

  SetupStuff(m: HitterMatrix[]) {
    this.hitterMatrix = m;
    ;
  }
}
