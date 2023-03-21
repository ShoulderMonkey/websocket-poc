import { Module } from '@nestjs/common';
import { RoomModule } from '../room/room.module';
import { RoomService } from '../room/room.service';


import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    RoomModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
