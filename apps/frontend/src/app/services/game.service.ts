import { Injectable } from "@angular/core";
import { map, tap } from "rxjs";
import { Game } from "../api-interfaces/game";
import { Player } from "../api-interfaces/player";
import { GameSocket } from "./game.socket";

@Injectable()
export class GameService {

  roomId?: string;
  game?: Game

  constructor(
    private gameSocket: GameSocket
  ){}

  joinGame(roomId: string, player: Player){
    return this.gameSocket.emit('join_game', {roomId: roomId, player: player})
  }

  getGame(){
    return this.gameSocket.fromEvent<Game>('game').pipe(
      map(game => {
        return game as Game
      }),
      tap((game: Game) => {
        this.game = game
      })
    )
  }
}
