import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { EndofseasonrosterComponent } from '../endofseasonroster/endofseasonroster.component';
import { User } from '../models/user.model';
import { ProtectionList } from '../ProtectionList';
import { UserService } from '../services/user.service';
import { Team } from '../team';
import { TeamService } from '../team.service';

@Component({
  selector: 'app-my-protectionlist',
  templateUrl: './my-protectionlist.component.html',
  styleUrls: ['./my-protectionlist.component.css']
})

export class MyProtectionListComponent implements OnInit {
  currentUser: User;
  teams: Team[];
  team: number;
  selectedTeam: Team;
  protectionlist: ProtectionList[];
  @ViewChild('endofseasonroster') roster: EndofseasonrosterComponent;

  constructor(private teamService: TeamService, private userService: UserService) { }

  ngOnInit(): void {
    // console.log('MyProtectionListComponent');
    this.currentUser = this.userService.GetUser();
    this.teamService.getTeam(this.currentUser.team).subscribe(team => this.selectedTeam = team);
    // console.log('user');
    // console.log(this.currentUser);
  }
  // teamSelected(team: Team) {
  //   this.selectedTeam = team;
  //   this.roster.loadData(this.selectedTeam.id);
  // }
}

