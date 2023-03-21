export class Room{

  id: string;
  players: Player[] = []
  maxPlayers: number;
  gameMaster: Player;

  constructor(gameMaster: Player){
    this.id = this.generateRoomCode(gameMaster)
    this.maxPlayers = 10
  }

  private generateRoomCode(gameMaster: Player) {
    const codeLength = 6; // the length of the code you want to generate
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < codeLength; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    //this.addPlayer(gameMaster);
    this.gameMaster = gameMaster
    return code;
  }

  addPlayer(player: Player, isGameMaster = false){
    player.isGameMaster = isGameMaster
    this.players.push(player)
  }

  playerLeft(playerSocketId:string){
    this.players.splice(this.players.findIndex(player => player.socketId === playerSocketId), 1)
  }


}

export class Player{
  id: string;
  name: string;
  socketId: string;
  role: any //TODO: create Role class
  isGameMaster: boolean = false;
  isAlive: boolean;
  killedBy: string;

  constructor(name: string, socketId){
    this.id = this.generateUniqueId(name)
    this.name = name;
    this.socketId = socketId
    this.isAlive = true;
  }

  generateUniqueId(name) {
    const timestamp = new Date().getTime().toString();
    const randomStr = Math.random().toString(36).substring(2, 8);
    return name.replace(/\s+/g, '') + timestamp + randomStr;
  }

  kill(killerRole: string){
    this.isAlive = false;
    this.killedBy = killerRole;
  }

  /* assignRole(role: Role){
    this.role = role;
  } */
}
