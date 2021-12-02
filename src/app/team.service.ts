import { Injectable } from '@angular/core';
import { Team } from './team';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  //private teamsUrl = 'http://127.0.0.1:8000/teams';
  private teamsUrl = environment.apiUrl + '/teams';

  private jsonresult;
  constructor(private http: HttpClient, private messageService: MessageService) { }

  getTeams(): Observable<Team[]> {
      return this.http.get<Team[]>(this.teamsUrl)
      .pipe(
        catchError(this.handleError('getTeams', []))
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
