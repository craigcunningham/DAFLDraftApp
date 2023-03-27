import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TeamsComponent } from './teams/teams.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DafldraftComponent } from './dafldraft/dafldraft.component';
import { PlayerAutocompleteComponent } from './player-autocomplete/player-autocomplete.component';
import { TeamAutocompleteComponent } from './team-autocomplete/team-autocomplete.component';
import { CheckPermissionDirective } from './services/permission-directive';
import { MatSortModule, Sort } from '@angular/material/sort';

import {
  MatButtonModule,
  MatCheckboxModule,
  MatNativeDateModule,
  MatFormFieldModule,
  MatAutocompleteModule,
  MatSidenavModule,
  MatDatepickerModule,
  MatMenuModule,
  MatIconModule,
  MatCardModule,
  MatSelectModule,
  MatToolbarModule,
  MatInputModule,
  MatDividerModule,
  MatTableModule,
  MatSelect,
  MatDivider} from '@angular/material';

import { RosterComponent } from './roster/roster.component';
import { RostercountsComponent } from './rostercounts/rostercounts.component';
import { AllrostersComponent } from './allrosters/allrosters.component';
import { TeamplayersComponent } from './teamplayers/teamplayers.component';
import { PurchasedPlayersComponent } from './purchased-players/purchased-players.component';
// import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { ProtectionListComponent } from './protection-list/protection-list.component';
import { EndofseasonrosterComponent } from './endofseasonroster/endofseasonroster.component';
import { PlayerrankingsComponent } from './playerrankings/playerrankings.component';
import { UserService } from './services/user.service';
import { LoginComponent } from './login/login.component';
import { MenuNavComponent } from './menu-nav/menu-nav.component';
import { MyProtectionListComponent } from './my-protectionlist/my-protectionlist.component';
import { PlayerDetailComponent } from './player-detail/player-detail.component';
import { PlayerTransactionsComponent } from './player-transactions/player-transactions.component';
import { PitcherRankingsComponent } from './pitcher-rankings/pitcher-rankings.component';
import { ProjectedStandingsComponent } from './projected-standings/projected-standings.component';
import { RosterMatrixComponent } from './roster-matrix/roster-matrix.component';
import { LastnamePipe } from './pipes/lastname.pipe';
import { AvailablePlayersComponent } from './available-players/available-players.component';


@NgModule({
  declarations: [
    AppComponent,
    TeamsComponent,
    DafldraftComponent,
    PlayerAutocompleteComponent,
    TeamAutocompleteComponent,
    RosterComponent,
    RostercountsComponent,
    AllrostersComponent,
    TeamplayersComponent,
    PurchasedPlayersComponent,
    ProtectionListComponent,
    EndofseasonrosterComponent,
    PlayerrankingsComponent,
    LoginComponent,
    CheckPermissionDirective,
    MenuNavComponent,
    MyProtectionListComponent,
    PlayerDetailComponent,
    PlayerTransactionsComponent,
    PitcherRankingsComponent,
    ProjectedStandingsComponent,
    RosterMatrixComponent,
    LastnamePipe,
    AvailablePlayersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    MatSortModule,
    MatTableModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatSidenavModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    MatDatepickerModule,
    MatToolbarModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDividerModule,
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
