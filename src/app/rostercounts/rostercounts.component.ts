import { Component, OnInit } from '@angular/core';

import { RosterCounts } from '../rosterCounts';
import { RosterService } from '../roster.service';

@Component({
  selector: 'app-rostercounts',
  templateUrl: './rostercounts.component.html',
  styleUrls: ['./rostercounts.component.css']
})
export class RostercountsComponent implements OnInit {
  teams: RosterCounts[];

  constructor(private rosterService: RosterService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.rosterService.getRostercounts()
    .subscribe(teams => this.teams = teams);
  }

}
