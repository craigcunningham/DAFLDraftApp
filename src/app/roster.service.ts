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
import { PlayerMove } from './models/PlayerMove';

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

MovePlayer (playerToMove: number, position: string): void {
  // console.log(`Move player ${playerToMove} to ${position}`);
  const url = `${this.rosterUrl}/MovePlayer`;
  // this.http.put<Roster>(this.rosterUrl, httpOptions).subscribe(r => {});
    console.log(`Called movePlayer with id=${playerToMove} and ${position}`);
    const obj = new PlayerMove();
    obj.id = playerToMove;
    obj.position = position;
    this.http.post<PlayerMove>(url, obj, httpOptions).pipe(
    tap(_ => console.log(`moved player id=${playerToMove} to ${position}`)),
      catchError(this.handleError<any>('updatePlayer'))
    );
}

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.messageService.add(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
