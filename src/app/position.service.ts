import { Injectable } from '@angular/core';
import { Position } from './position';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PositionService {
  private positionsUrl = environment.apiUrl + 'Positions';

  constructor(private http: HttpClient, private messageService: MessageService) { }

  getPositions(): Observable<Position[]> {
    return this.http.get<Position[]>(this.positionsUrl);
  }

  getPositionsForPlayer(player_id): Observable<Position[]> {
    const url = `${this.positionsUrl}/ByPlayer/${player_id}`;
    return this.http.get<Position[]>(url);
  }
}
