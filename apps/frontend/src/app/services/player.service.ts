import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Player } from "../api-interfaces/player";
import { GameSocket } from "./game.socket";

@Injectable()
export class PlayerService {

  player?: Player;
  socketId?: string;
  baseApi = 'http://localhost:3333/'

  constructor(private http: HttpClient, private gameSocket: GameSocket){
    this.gameSocket.getMyId().subscribe((id:any) => {
      console.log('socketId: ', id);

      this.socketId = id
    })
  }

  createPlayer(name: string){
    return this.http.post<Player>(this.baseApi + 'new-player', {name: name, socketId: this.socketId})
  }

  createGame(playerId: string){
    return this.http.post<string>(this.baseApi + `new-room`, {playerId: playerId})
  }

}
