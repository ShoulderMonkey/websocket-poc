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

  nextPhase(){
    return this.gameSocket.emit('next_game_phase', {roomId: this.roomId})
  }

  isMyNightTurn(role:string){
    return this.gameSocket.isMyNightTurn(role)
  }

  executeNightAction(targetPlayerId: string, selfPlayer: Player){
    return this.gameSocket.emit('execute_night_action', {
      roomId: this.roomId,
      player: selfPlayer,
      targetPlayerId: targetPlayerId
    })
  }

  voteDay(voteFor: string, selfPlayer: Player){
    return this.gameSocket.emit('vote_day', {
      roomId: this.roomId,
      player: selfPlayer,
      voteFor: voteFor
    })
  }
}
