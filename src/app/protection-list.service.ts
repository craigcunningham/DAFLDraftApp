import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../environments/environment';
import { Observable, of } from 'rxjs';
import { ProtectionList } from './ProtectionList';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ProtectionListService {
  private rosterUrl = environment.apiUrl + 'ProtectionList';

  constructor(private http: HttpClient) { }

  getListForTeam(teamid: number): Observable<ProtectionList[]> {
    const url = `${this.rosterUrl}/${teamid}`;
    return this.http.get<ProtectionList[]>(url);
  }

  addPlayerToList(teamid: number, playerid: number) {
    const url = `${this.rosterUrl}/AddPlayer`;
    const protection: ProtectionList = {
      player_id: playerid,
      Team_id: teamid,
      Protect: 1,
      Player: '',
      PlayerName: '',
      Positions: '',
      new_salary: 0,
      new_contract: 0,
      OldSalary: 0,
      OldContract: 0,
      ADP: 0
    };
    return this.http.post<ProtectionList>(url, protection, httpOptions).subscribe(r => {});
  }

  removePlayerFromList(teamid: number, playerid: number) {
    const url = `${this.rosterUrl}/RemovePlayer`;
    const protection: ProtectionList = {
      player_id: playerid,
      Team_id: teamid,
      Protect: 0,
      Player: '',
      PlayerName: '',
      Positions: '',
      new_salary: 0,
      new_contract: 0,
      OldSalary: 0,
      OldContract: 0,
      ADP: 0
    };

    return this.http.post<ProtectionList>(url, protection, httpOptions).subscribe(r => {});
  }
}
