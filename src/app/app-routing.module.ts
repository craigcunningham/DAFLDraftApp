import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DafldraftComponent } from './dafldraft/dafldraft.component';
import { RosterComponent } from './roster/roster.component';
import { TeamsComponent } from './teams/teams.component';

const routes: Routes = [
  { path: '', redirectTo: 'dafldraft', pathMatch: 'full' },
  { path: 'rosters/:id', component: RosterComponent },
  { path: 'teams', component: TeamsComponent },
  { path: 'dafldraft', component: DafldraftComponent },
  { path: 'rosters', component: RosterComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }

