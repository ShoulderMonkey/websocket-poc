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

import { GamePhase, Player, Room } from './room';
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
    //console.log('room:', room);

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

  @SubscribeMessage('next_game_phase')
  async onNextGamePhase(@MessageBody()payload: NextGamePhasePayload){
    let room = this.roomService.getRoom(payload.roomId)
    room.nextPhase()
    this.server.to(payload.roomId).emit('game', room)
    if(room.gamePhase.isNight){
      this.handleNightPhase(room.gamePhase, room.id)
    }
  }

  @SubscribeMessage('vote_day')
  async onVoteDay(@MessageBody()payload: VoteDayPayload){
    let room = this.roomService.getRoom(payload.roomId)
    room.gamePhase.setVote(payload.player.id, payload.voteFor)
    this.server.to(payload.roomId).emit('game', room)
  }

  @SubscribeMessage('execute_night_action')
  async onExecuteNightAction(@MessageBody()payload: NightActionPayload){
    let room = this.roomService.getRoom(payload.roomId)
    let isNight
    //register night action
    room.gamePhase.setVote(payload.player.id, payload.targetPlayerId)
    if(room.gamePhase.turnName === 'wolf'){
      let wolvesCount = room.gamePhase.players.filter(player => player.role.name === 'wolf').length
      let wolvesVotedCount = room.gamePhase.players.filter(player => player.votedFor !== null).length
      if(wolvesCount === wolvesVotedCount){
        //wolves did vote
        isNight = room.gamePhase.nextTrunName()

        isNight ? this.handleNightPhase(room.gamePhase, room.id): this.nightIsOver(room)
      }else{
        //wolves missing vote
      }
    }else{
      isNight = room.gamePhase.nextTrunName()
      isNight ? this.handleNightPhase(room.gamePhase, room.id): this.nightIsOver(room)
    }
  }

  private handleNightPhase(phase: GamePhase, roomId: string){
    this.server.to(roomId).emit(phase.turnName, true)
  }

  private nightIsOver(room: Room){
    room.players = room.gamePhase.elaborateResults()
    this.server.to(room.id).emit('game', room)
  }
}

export interface JoinGamePayload{
  roomId: string,
  player: Player
}

export interface NextGamePhasePayload{
  roomId: string
}

export interface VoteDayPayload extends JoinGamePayload{
  voteFor: string;
}

export interface NightActionPayload extends JoinGamePayload{
  targetPlayerId: string;
}
