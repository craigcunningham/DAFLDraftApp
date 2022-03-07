import { Component, OnInit } from '@angular/core';
import { HitterRanking, PitcherRanking } from '../ranking';
import { PlayerService } from '../player.service';
import { PositionalRanking } from '../positional-ranking';

@Component({
  selector: 'app-playerrankings',
  templateUrl: './playerrankings.component.html',
  styleUrls: ['./playerrankings.component.css']
})
export class PlayerrankingsComponent implements OnInit {
  rankings: HitterRanking[];
  positionalRanking = {} as PositionalRanking;
  pitcherRanking: PitcherRanking[];
  pos: string;
  selectedSystem: string;

  constructor(private playerService: PlayerService) { }

  ngOnInit(): void {
    this.getRankings('Steamer');
  }
  systemSelected(system: any) {
    this.getRankings(system.currentTarget.value);
  }
  getRankings(system: string) {
    this.playerService.GetPitcherRankings(system).subscribe(p => this.pitcherRanking = p);
    this.playerService.GetHitterRankings(system).subscribe(r => this.SetUpStuff(r));
  }
  SetUpStuff(r: HitterRanking[]) {
    this.rankings = r;
    this.positionalRanking['C'] = this.rankings.filter(function(rank) { if (rank.eligible) { return rank.eligible.indexOf('C') >= 0; }});
    this.positionalRanking['1B'] = this.rankings.filter(function(rank) { if (rank.eligible) { return rank.eligible.indexOf('1B') >= 0; }});
    this.positionalRanking['2B'] = this.rankings.filter(function(rank) { if (rank.eligible) { return rank.eligible.indexOf('2B') >= 0; }});
    this.positionalRanking['3B'] = this.rankings.filter(function(rank) { if (rank.eligible) { return rank.eligible.indexOf('3B') >= 0; }});
    this.positionalRanking['OF'] = this.rankings.filter(function(rank) { if (rank.eligible) { return rank.eligible.indexOf('OF') >= 0; }});
    this.positionalRanking['SS'] = this.rankings.filter(function(rank) { if (rank.eligible) { return rank.eligible.indexOf('SS') >= 0; }});
    this.positionalRanking['U'] = this.rankings.filter(function(rank) { if (rank.eligible) { return rank.eligible.indexOf('U') === 0; }});
    this.positionalRanking['P'] = this.rankings.filter(function(rank) { if (rank.eligible) { return rank.eligible.indexOf('P') >= 0; }});
  }

}
