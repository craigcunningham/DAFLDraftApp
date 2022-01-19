import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Team } from '../team';
import { TeamService } from '../team.service';
import { ProtectionListService } from '../protection-list.service';
import { ProtectionList } from '../ProtectionList';
import { EndofseasonrosterComponent } from '../endofseasonroster/endofseasonroster.component';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-protection-list',
  templateUrl: './protection-list.component.html',
  styleUrls: ['./protection-list.component.css']
})
export class ProtectionListComponent implements OnInit {
  currentUser: User;
  teams: Team[];
  team: number;
  selectedTeam: Team;
  protectionlist: ProtectionList[];
  @ViewChild('endofseasonroster') roster: EndofseasonrosterComponent;

  constructor(private teamService: TeamService, private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.currentUser = this.userService.GetUser();
    this.team = +this.route.snapshot.paramMap.get('id');
    if (this.team > 0 && this.team === this.currentUser.team) {
      this.teams = new Array<Team>();
      this.teamService.getTeam(this.team).subscribe(team => this.teams.push(team));
    } else {
      this.teamService.getTeams().subscribe(teams => this.teams = teams);
    }
  }
  teamSelected(team: number) {
    this.selectedTeam = this.teams.find(t => t.id === Number(this.team));
    this.roster.loadData(this.selectedTeam.id);
  }
}


