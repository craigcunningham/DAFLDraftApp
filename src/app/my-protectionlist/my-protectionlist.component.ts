import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  @Input() teamid: number;
  teams: Team[];
  team: number;
  selectedTeam: Team;
  protectionlist: ProtectionList[];
  @ViewChild('endofseasonroster') roster: EndofseasonrosterComponent;

  constructor(private teamService: TeamService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let id = 0;
    if (+this.route.snapshot.paramMap.get('id')) {
      id = +this.route.snapshot.paramMap.get('id');
    }
    this.teamid = id;
    this.teamService.getTeam(this.teamid).subscribe(team => this.selectedTeam = team);
  }
  // teamSelected(team: Team) {
  //   this.selectedTeam = team;
  //   this.roster.loadData(this.selectedTeam.id);
  // }
}

