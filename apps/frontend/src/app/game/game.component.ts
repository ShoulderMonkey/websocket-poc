import { Component, OnInit } from '@angular/core';
import { Subscriber } from 'rxjs';
import { Game } from '../api-interfaces/game';
import { Player } from '../api-interfaces/player';
import { GameService } from '../services/game.service';
import { GameSocket } from '../services/game.socket';
import { PlayerService } from '../services/player.service';


@Component({
  selector: 'websocket-poc-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  host: {
    class: 'child-container'
  }
})
export class GameComponent implements OnInit {

  players: Player[] = []

  constructor(
    public gameService: GameService,
    private playerService: PlayerService
  ){}

  ngOnInit(): void {
    this.gameService.getGame().subscribe({
      next: (game: Game) => {
          console.log(game);

          this.players = game.players!
      },
    })

    this.gameService.joinGame(this.gameService.roomId!, this.playerService.player!)
  }
}
