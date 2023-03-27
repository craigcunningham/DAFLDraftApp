import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '../environments/environment';
import { Player } from './player';
import { Transaction } from './transaction';
import { HitterRanking, PitcherRanking } from './ranking';
import { MessageService } from './message.service';
import { PlayerMove } from './models/PlayerMove';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private playersUrl = environment.apiUrl + 'Players';

  getPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(this.playersUrl)
        .pipe(
          catchError(this.handleError('getPlayers', []))
          );
  }

  getPlayer(id: number): Observable<Player> {
    const url = `${this.playersUrl}/${id}`;
    return this.http.get<Player>(url).pipe(
      catchError(this.handleError<Player>(`getPlayer id=${id}`))
    );
  }

  getPlayerAtPostionForTeam(teamid: number, position: string): Observable<Player> {
    const url = `${this.playersUrl}/AtPositionForTeam/${teamid}/${position}`;
    return this.http.get<Player>(url);
  }

  getPlayersAtPostionForTeam(teamid: number, position: string): Observable<Player[]> {
    const url = `${this.playersUrl}/AtPositionForTeam/${teamid}/${position}`;
    return this.http.get<Player[]>(url);
  }

  GetSalary(playerid: number): Observable<number> {
    const url = `${this.playersUrl}/GetSalary/${playerid}`;
    return this.http.get<number>(url);
  }
  GetTransactions(playerid: number): Observable<Transaction[]> {
    const url = `${this.playersUrl}/GetTransactions/${playerid}`;
    return this.http.get<Transaction[]>(url);
  }

  GetHitterRankings(system: string) {
    const year = new Date().getFullYear();
    const url = `${this.playersUrl}/HitterRankings/${year}/${system}`;
    return this.http.get<HitterRanking[]>(url);
  }
  GetPlayersByAdp() {
    const year = new Date().getFullYear();
    const url = `${this.playersUrl}/ByAdp`;
    return this.http.get<Player[]>(url);
  }

  GetPitcherRankings(system: string) {
    const year = new Date().getFullYear();
    if (system === 'TheBatX') {
      system = 'TheBat';
    }
    const url = `${this.playersUrl}/PitcherRankings/${year}/${system}`;
    return this.http.get<PitcherRanking[]>(url);
  }

  updatePlayer(player: Player): Observable<any> {
    return this.http.put(this.playersUrl, player, httpOptions).pipe(
      tap(_ => this.log(`updated player id=${player.id}`)),
      catchError(this.handleError<any>('updatePlayer'))
    );
  }

  addPlayer (player: Player): Observable<Player> {
    return this.http.post<Player>(this.playersUrl, player, httpOptions).pipe(
      tap((player1: Player) => this.log(`added player w/ id=${player1.id}`)),
      catchError(this.handleError<Player>('addPlayer'))
    );
  }

  deletePlayer(player: Player | number): Observable<Player> {
    const id = typeof player === 'number' ? player : player.id;
    const url = `${this.playersUrl}/${id}`;

    return this.http.delete<Player>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted player id=${id}`)),
      catchError(this.handleError<Player>('deletePlayer'))
    );
  }

  searchPlayers(term: string): Observable<Player[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Player[]>(`${this.playersUrl}/SearchByName/${term}`).pipe(
      tap(_ => this.log(`found players matching "${term}"`)),
      catchError(this.handleError<Player[]>('searchPlayers', []))
    );
  }

  private log(message: string) {
    this.messageService.add(`PlayerService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error);
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result
      return of(result as T);
    };
  }

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }
}
