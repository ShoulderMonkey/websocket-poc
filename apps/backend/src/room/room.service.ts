import { Injectable } from "@nestjs/common";
import { Player, Room } from "./room";

@Injectable()
export class RoomService {
  players: Player[] = []
  rooms: Room[] = []

  constructor(){}

  createRoom(gameMaster: Player): string{
    const room = new Room(gameMaster)
    this.rooms.push(room)
    return room.id
  }

  deleteRoom(roomId: string){
    this.rooms.splice(this.rooms.findIndex(room => room.id === roomId))
  }

  getRoom(id: string): Room | undefined{
    return this.rooms.find(room => room.id === id)
  }

  createPlayer(name: string, socketId: string): Player{
    const newPlayer = new Player(name, socketId);
    this.players.push(newPlayer)
    return newPlayer
  }

  getPlayer(id: string): Player | undefined{
    // return this.rooms.flatMap(room => room.players).find(player => player.id === id)
    return this.players.find(player => player.id === id)
  }

  getPlayerBySocketId(socketId: string): Player | undefined{
    return this.players.find(player => player.socketId === socketId)
  }
}
