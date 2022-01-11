import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DafldraftComponent } from './dafldraft/dafldraft.component';
import { RosterComponent } from './roster/roster.component';
import { TeamsComponent } from './teams/teams.component';
import { ProtectionListComponent } from './protection-list/protection-list.component';
import { PlayerrankingsComponent } from './playerrankings/playerrankings.component';

const routes: Routes = [
  { path: '', redirectTo: 'dafldraft', pathMatch: 'full' },
  { path: 'rosters/:id', component: RosterComponent },
  { path: 'teams', component: TeamsComponent },
  { path: 'dafldraft', component: DafldraftComponent },
  { path: 'rosters', component: RosterComponent },
  { path: 'rankings', component: PlayerrankingsComponent },
  { path: 'protection-list', component: ProtectionListComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }

