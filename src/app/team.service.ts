import { Injectable } from '@angular/core';
import { Team } from './team';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private teamsUrl = 'http://localhost:8000/Teams';

  constructor(private http: HttpClient, private messageService: MessageService) { }

  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(this.teamsUrl);
  }
}
