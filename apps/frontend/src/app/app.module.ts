import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { HomeComponent } from './home/home.component';
import {HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import { PlayerService } from './services/player.service';
import { GameSocket } from './services/game.socket';
import { GameService } from './services/game.service';




const MATERIAL_MODULES = [
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatStepperModule,
  MatButtonModule
]


@NgModule({
  declarations: [AppComponent, NxWelcomeComponent, HomeComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),

    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,

    ...MATERIAL_MODULES
  ],
  providers: [PlayerService, GameSocket, GameService],
  bootstrap: [AppComponent],
})
export class AppModule {}
