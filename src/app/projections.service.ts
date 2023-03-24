import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HitterStats } from './models/HitterStats';
import { PitchingStats } from './models/PitchingStats';

@Injectable({
  providedIn: 'root'
})
export class ProjectionsService {
  private rosterUrl = environment.apiUrl + 'Rosters';

  constructor(private http: HttpClient) {}

  GetTeamHitterProjections(system: string): Observable<HitterStats[]> {
    const year = (new Date()).getFullYear();
    const url = `${this.rosterUrl}/RosterHitterProjections/${year}/${system}`;
    return this.http.get<HitterStats[]>(url);
  }
  GetTeamPitcherProjections(system: string): Observable<PitchingStats[]> {
    const year = (new Date()).getFullYear();
    const url = `${this.rosterUrl}/RosterPitcherProjections/${year}/${system}`;
    return this.http.get<PitchingStats[]>(url);
  }
}
