import { Injectable } from "@angular/core";
import { Socket, SocketIoConfig } from "ngx-socket-io";




@Injectable()
export class GameSocket extends Socket {

  socket?: Socket

  constructor() {
    const config: SocketIoConfig = { url: ':3333', options: {}, };

    super(config);
  }

  getMyId(){
    return this.fromEvent('socketId')
  }

  getRoom() {
    return this.fromEvent('player_joined')
  }

  isMyNightTurn(role: string){
    return this.fromEvent<boolean>(role)
  }
}
