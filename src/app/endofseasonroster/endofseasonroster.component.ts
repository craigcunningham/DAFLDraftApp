import { Component, Input, OnInit } from '@angular/core';
import { ProtectionListService } from '../protection-list.service';
import { ProtectionList } from '../ProtectionList';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-endofseasonroster',
  templateUrl: './endofseasonroster.component.html',
  styleUrls: ['./endofseasonroster.component.css']
})
export class EndofseasonrosterComponent implements OnInit {
  roster: ProtectionList[];
  protectedCount: number;
  protectedSalary: number;
  addPlayerSalary: number;
  actionedPlayer: ProtectionList;
  @Input() teamid: number;

  constructor(private protectionListService: ProtectionListService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadData(this.teamid);
  }

  loadData(teamid: number) {
    this.teamid = teamid;
    this.protectionListService.getListForTeam(teamid)
    .subscribe(list => this.setStuff(list));
  }
  onProtectChange(event) {
    if (event.currentTarget.checked) {
      this.protectionListService.addPlayerToList(this.teamid, event.currentTarget.value);
      this.protectedSalary += this.roster.find(p => p.player_id === parseInt(event.currentTarget.value, 10)).new_salary;
      this.protectedCount += 1;
    }  else {
      this.protectionListService.removePlayerFromList(this.teamid, event.currentTarget.value);
      this.protectedSalary -= this.roster.find(p => p.player_id === parseInt(event.currentTarget.value, 10)).new_salary;
      this.protectedCount -= 1;
    }
  }

  setStuff(list: any) {
    this.roster = list;
    this.protectedCount = list.filter(x => x.protect === 1).length;
    this.protectedSalary = 0;
     list.forEach(p => {
      if (p.protect === 1) {
        this.protectedSalary += p.new_salary;
      }
    });
  }

}
