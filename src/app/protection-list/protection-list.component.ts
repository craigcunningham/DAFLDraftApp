import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Team } from '../team';
import { TeamService } from '../team.service';
import { ProtectionListService } from '../protection-list.service';
import { ProtectionList } from '../ProtectionList';
import { EndofseasonrosterComponent } from '../endofseasonroster/endofseasonroster.component';

@Component({
  selector: 'app-protection-list',
  templateUrl: './protection-list.component.html',
  styleUrls: ['./protection-list.component.css']
})
export class ProtectionListComponent implements OnInit {
  teams: Team[];
  team: number;
  selectedTeam: Team;
  protectionlist: ProtectionList[];
  @ViewChild('endofseasonroster') roster: EndofseasonrosterComponent;

  constructor(private teamService: TeamService) { }

  ngOnInit(): void {
    this.teamService.getTeams()
    .subscribe(teams => this.teams = teams);
  }
  teamSelected(team: number) {
    this.selectedTeam = this.teams.find(t => t.id === Number(this.team));
    this.roster.loadData(this.selectedTeam.id);
  }
}
