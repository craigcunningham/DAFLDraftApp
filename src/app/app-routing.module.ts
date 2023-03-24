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
import { PlayerDetailComponent } from './player-detail/player-detail.component';
import { PitcherRankingsComponent } from './pitcher-rankings/pitcher-rankings.component';
import { ProjectedStandingsComponent } from './projected-standings/projected-standings.component';

const routes: Routes = [
  { path: '', redirectTo: 'dafldraft', pathMatch: 'full' },
  { path: 'rosters/:id', component: RosterComponent },
  { path: 'teams', component: TeamsComponent, canActivate: [AuthorizeGuard] },
  { path: 'dafldraft', component: DafldraftComponent, canActivate: [AuthorizeGuard] },
  { path: 'rosters', component: RosterComponent },
  { path: 'rankings', component: PlayerrankingsComponent, canActivate: [AuthorizeGuard]  },
  { path: 'hitter-rankings', component: PlayerrankingsComponent, canActivate: [AuthorizeGuard]  },
  { path: 'pitcher-rankings', component: PitcherRankingsComponent, canActivate: [AuthorizeGuard]  },
  { path: 'projected-standings', component: ProjectedStandingsComponent, canActivate: [AuthorizeGuard]  },
  { path: 'protection-list', component: ProtectionListComponent, canActivate: [AuthorizeGuard]  },
  { path: 'my-protection-list/:id', component: MyProtectionListComponent },
  { path: 'player-details/:id', component: PlayerDetailComponent },
  { path: 'player-details', component: PlayerDetailComponent },
  { path: 'login/:password', component: LoginComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }

