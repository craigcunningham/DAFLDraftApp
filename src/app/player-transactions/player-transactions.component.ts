import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlayerService } from '../player.service';
import { Transaction } from '../transaction';

@Component({
  selector: 'app-player-transactions',
  templateUrl: './player-transactions.component.html',
  styleUrls: ['./player-transactions.component.css']
})
export class PlayerTransactionsComponent implements OnInit {
  transactions: Transaction[];

  @Input() playerid: number;

  constructor(private playerService: PlayerService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadData(this.playerid);
  }

  loadData(playerid: number) {
    console.log('player-transactions: ' + playerid);
    this.playerid = playerid;
    this.playerService.GetTransactions(playerid).subscribe(t => this.transactions = t);
  }
}
