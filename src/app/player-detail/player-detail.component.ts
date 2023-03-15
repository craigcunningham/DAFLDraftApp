import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PlayerTransactionsComponent } from '../player-transactions/player-transactions.component';

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.css']
})
export class PlayerDetailComponent implements OnInit {
  @Input() playerid: number;
  placeHolder = 'Player Name';
  @ViewChild('playerTransactions') playerTransactions: PlayerTransactionsComponent;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    let id = 0;
    if (+this.route.snapshot.paramMap.get('id')) {
      id = +this.route.snapshot.paramMap.get('id');
    }

    this.playerid = id;
    this.playerTransactions.loadData(this.playerid);
  }

  playerSelected(player: any) {
    this.playerid = player.player_id;
    this.playerTransactions.loadData(player.player_id);
  }
}
