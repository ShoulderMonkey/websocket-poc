import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';

import { GameComponent } from './game.component';
import { PlayerCardComponent } from './player-card/player-card.component';

import {MatCardModule} from '@angular/material/card';
import { PlayersListComponent } from './players-list/players-list.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';

import { PlayerSelectionModalComponent } from './player-selection-modal/player-selection-modal.component';
import { NotificationDialogComponent } from '../shared/notification-dialog/notification-dialog.component';
import { NotificationService } from '../shared/notification.service';
import { SharedModule } from '../shared/shared.module';


const MATERIAL_MODULES = [
  MatCardModule,
  MatIconModule,
  MatButtonModule,
  MatDialogModule
]

@NgModule({
  declarations: [
    GameComponent,
    PlayerCardComponent,
    PlayersListComponent,
    PlayerSelectionModalComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    GameRoutingModule,
    ...MATERIAL_MODULES
  ],
  providers: [
  ]
})
export class GameModule { }
