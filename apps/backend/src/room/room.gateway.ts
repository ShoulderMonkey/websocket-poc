import { UseInterceptors, WebSocketAdapter } from '@nestjs/common';
import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    OnGatewayConnection,
    OnGatewayDisconnect,
    MessageBody,
  } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

import { Player, Room } from './room';
import { RoomService } from './room.service';


@WebSocketGateway({ cors: '*:*' })
export class RoomGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  players: Player[] = []

  constructor(private roomService: RoomService){}

  async handleConnection(socket: Socket) {
    // A client has connected
    //notify the user his socketId
    socket.emit('socketId', socket.id)
  }

  async handleDisconnect(socket: Socket) {
    // A client has disconnected
    console.log('a player si leaving');

    let room = this.roomService.rooms.find(room => room.players.some(player => player.socketId === socket.id))
    console.log('room:', room);

    if(room){
      await this.server.in(socket.id).socketsLeave(room.id)
      room.playerLeft(socket.id)
      if(room.players.length === 0){
        //delete room and disconnect sockets
        this.roomService.deleteRoom(room.id)
        this.server.to(room.id).disconnectSockets()
      }else{
        this.server.to(room.id).emit('game', room)
      }

    }

    // Notify connected clients of current players

  }

  @SubscribeMessage('join_game')
  async onJoinGame(@MessageBody()payload: JoinGamePayload ) {
    console.log(`${payload.player.socketId} is joining ${payload.roomId}`);

    await this.server.in(payload.player.socketId).socketsJoin(payload.roomId)

    let room = this.roomService.getRoom(payload.roomId)
    const isGameMaster = room.gameMaster.id ===payload.player.id?true: false
    room.addPlayer(payload.player,isGameMaster)
    this.server.to(payload.roomId).emit('game', room)
  }
}

export interface JoinGamePayload{
  roomId: string,
  player: Player
}
