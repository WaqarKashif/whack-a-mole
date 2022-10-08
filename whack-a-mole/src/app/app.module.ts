import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { scoreReducer } from './state/score.reducer';
import { WhackAMoleComponent } from './components/whack-a-mole/whack-a-mole.component';
import { ScoresComponent } from './components/scores/scores.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { SCORE_STATE_NAME } from './state/score.selcetors';

@NgModule({
  declarations: [
    AppComponent,
    WhackAMoleComponent,
    ScoresComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({counter: scoreReducer}),
    StoreModule.forFeature(SCORE_STATE_NAME, scoreReducer),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: false, // Pauses recording actions and state changes when the extension window is not open
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
