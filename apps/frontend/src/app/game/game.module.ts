import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';

import { GameComponent } from './game.component';
import { PlayerCardComponent } from './player-card/player-card.component';

import {MatCardModule} from '@angular/material/card';
import { PlayersListComponent } from './players-list/players-list.component';
import { MatIconModule } from '@angular/material/icon';


const MATERIAL_MODULES = [
  MatCardModule,
  MatIconModule
]

@NgModule({
  declarations: [
    GameComponent,
    PlayerCardComponent,
    PlayersListComponent
  ],
  imports: [
    CommonModule,
    GameRoutingModule,
    ...MATERIAL_MODULES
  ],
  providers: [
  ]
})
export class GameModule { }
