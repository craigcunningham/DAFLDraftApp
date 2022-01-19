import { Component, OnInit } from '@angular/core';
import { Team } from '../team';
import { TeamService } from '../team.service';
import {MatDividerModule} from '@angular/material/divider';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  teams: Team[];
  constructor(private teamService: TeamService) { }

  ngOnInit() {
    this.teamService.getTeams()
    .subscribe(teams => this.teams = teams);
  }

}
