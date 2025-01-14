import { Component, OnInit } from '@angular/core';
import { GameService } from './services/game.service';

import { PlayerService } from './services/player.service';

@Component({
  selector: 'websocket-poc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'frontend';

  constructor(
    public gameService: GameService
  ){}

  ngOnInit(){

  }
}
