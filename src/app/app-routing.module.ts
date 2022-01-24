import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DafldraftComponent } from './dafldraft/dafldraft.component';
import { RosterComponent } from './roster/roster.component';
import { TeamsComponent } from './teams/teams.component';
import { ProtectionListComponent } from './protection-list/protection-list.component';
import { PlayerrankingsComponent } from './playerrankings/playerrankings.component';
import { LoginComponent } from './login/login.component';
import { AuthorizeGuard } from './services/authorize.guard';
import { MyProtectionListComponent } from './my-protectionlist/my-protectionlist.component';
import { MyRosterComponent } from './my-roster/my-roster.component';

const routes: Routes = [
  { path: '', redirectTo: 'dafldraft', pathMatch: 'full' },
  { path: 'rosters/:id', component: RosterComponent },
  { path: 'teams', component: TeamsComponent, canActivate: [AuthorizeGuard] },
  { path: 'dafldraft', component: DafldraftComponent, canActivate: [AuthorizeGuard] },
  { path: 'rosters', component: RosterComponent },
  { path: 'rankings', component: PlayerrankingsComponent, canActivate: [AuthorizeGuard]  },
  { path: 'protection-list', component: ProtectionListComponent, canActivate: [AuthorizeGuard]  },
  { path: 'my-protection-list', component: MyProtectionListComponent },
  { path: 'my-roster', component: MyRosterComponent },
  { path: 'login/:password', component: LoginComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }

