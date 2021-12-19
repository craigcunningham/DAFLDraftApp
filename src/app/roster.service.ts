import { Injectable } from '@angular/core';
import { Roster } from './roster';
import { RosterCounts } from './rosterCounts';
import { TeamRoster } from './teamroster';
import { Position } from './position';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RosterAddition } from './rosterAddition';
import { environment } from './../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class RosterService {
  private rosterUrl = environment.apiUrl + 'Rosters';

  constructor(private http: HttpClient, private messageService: MessageService) { }

  getRoster(id: number): Observable<Roster> {
    const url = `${this.rosterUrl}/${id}`;
    return this.http.get<Roster>(url);
  }

  getTeamRoster(teamid: number): Observable<TeamRoster> {
    const url = `${this.rosterUrl}/TeamRoster/${teamid}`;
    return this.http.get<TeamRoster>(url);
  }

  getRostercounts(): Observable<RosterCounts[]> {
    const url = `${this.rosterUrl}/RosterCounts`;
    return this.http.get<RosterCounts[]>(url);
  }

  GetTenMostRecentAdditions(): Observable<RosterAddition[]> {
    const url = `${this.rosterUrl}/GetLastTenAdditions`;
    return this.http.get<RosterAddition[]>(url);
  }

  addPlayerToTeam (playerToAdd: number, position: string, team: number,
                  salary: number, contractYear: number, dateToAdd: Date): Observable<Roster> {
    const roster: Roster = {id: 0, player_id: playerToAdd,
    team_id: team, salary: salary, contract_year: contractYear,
    time_drafted: dateToAdd, position: position};

    return this.http.post<Roster>(this.rosterUrl, roster, httpOptions);
  }

MovePlayer (playerToMove: number, position: Position): void {
  const url = `${this.rosterUrl}/MovePlayer/${playerToMove}/${position.position}`;
  this.http.put<Roster>(this.rosterUrl, httpOptions).subscribe(r => {});
}

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.messageService.add(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
