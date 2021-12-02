import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TeamsComponent } from './teams/teams.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HttpClientXsrfModule, HttpClientJsonpModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { DafldraftComponent } from './dafldraft/dafldraft.component';
import { PlayerAutocompleteComponent } from './player-autocomplete/player-autocomplete.component';
import { TeamAutocompleteComponent } from './team-autocomplete/team-autocomplete.component';
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
  MatInputModule,
  MatSelect} from '@angular/material';
import { RosterComponent } from './roster/roster.component';
import { RostercountsComponent } from './rostercounts/rostercounts.component';
import { AllrostersComponent } from './allrosters/allrosters.component';
import { TeamplayersComponent } from './teamplayers/teamplayers.component';
import { PurchasedPlayersComponent } from './purchased-players/purchased-players.component';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
//import { HttpXSRFInterceptor } from './_providers';

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
    PurchasedPlayersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'csrftoken',
      headerName: 'X-CSRFToken'
    }) ,
    //HttpXSRFInterceptor,
    HttpClientJsonpModule,
    MatInputModule,
    MatButtonModule,
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
    MatSelectModule,
    ReactiveFormsModule,
    DropDownsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
