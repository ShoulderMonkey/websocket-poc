import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Player } from '../room/room';
import { RoomService } from '../room/room.service';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private roomService: RoomService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Post('new-player')
  createPlayer(@Body()body: any): Player{
    return this.roomService.createPlayer(body.name, body.socketId)
  }

  @Post('new-room')
  createRoom(@Body() body){
    const player = this.roomService.getPlayer(body.playerId)
    return JSON.stringify(this.roomService.createRoom(player))
  }
}
