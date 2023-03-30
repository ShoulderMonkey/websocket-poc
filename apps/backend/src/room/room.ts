import { stringify } from "querystring";
import { Boomer, Fool, Protector, Role, Seer, Sheriff, SuperVillager, TransformerWolf, Vampire, Wolf } from "./role";

export class Room{
  roles: Role[] = []
  id: string;
  players: Player[] = []
  maxPlayers: number;
  minPlayers: number;
  gameMaster: Player;
  gamePhase: GamePhase;

  constructor(gameMaster: Player){
    this.id = this.generateRoomCode(gameMaster)
    this.maxPlayers = 9
    this.minPlayers = 5
    this.roles = [
      new Wolf(),
      new Protector(),
      new Seer(),
      new Fool(),
      new SuperVillager(),
      new Vampire(),
      new TransformerWolf(),
      new Boomer(),
      new Sheriff()
    ]
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

  nextPhase(){
    if(this.gamePhase === undefined){
      this.startGame()
    }else{
      this.players = this.gamePhase.players
      this.gamePhase = new GamePhase(this.players, true, this.roles)
    }
  }

  private startGame(){
    this.giveRoles()
    this.gamePhase = new GamePhase(this.players, true, this.roles);
  }

  giveRoles(){
    this.players[Math.floor(Math.random() * this.players.length)].role = new Wolf()
    let extraRoles = []
    this.roles.forEach((role) => {
      //wolf is already assigned
      if(role.name !== 'wolf'){
        let roleLessPlayers = this.players.filter(player => player.role === null) || []
        if(roleLessPlayers.length !== 0){ // check if all players have role
          let assigningToId =  roleLessPlayers[Math.floor(Math.random() * roleLessPlayers.length)].id
          let i = this.players.findIndex(player => player.id === assigningToId)
          this.players[i].role = role
        }else{
          extraRoles.push(role)
        }
      }
    })

    this.roles = this.roles.filter(role => !extraRoles.includes(role))
    console.log('rolesLeft: ', this.roles.map(role => role.name));
  }


}

export class Player{
  id: string;
  name: string;
  socketId: string;
  role: Role = null;
  isGameMaster: boolean = false;
  isAlive: boolean;
  killedBy: string;
  seenBySeer: boolean = false;
  votedFor: string = null;

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

export class GamePhase {

  isNight: boolean;
  players: Player[];
  isOver: boolean = false;
  turnName: string;
  roles: Role[]

  constructor(players: Player[], isNight: boolean, roles: Role[]){
    this.isNight = isNight
    this.players = players
    this.turnName = 'wolf',
    this.roles = roles
  }

  getTurnPlayers(){
    return this.players.filter(player => player.role.name === this.turnName)
  }

  elaborateResults(){
    if(!this.isNight){
      let mostVoted = this.elaborateDayResults()
      mostVoted.role.dayLifes -= 1
      if(mostVoted.role.dayLifes < 1){
        mostVoted.kill('voted')
      }
    }else{
      this.elaborateNightResults()
    }

    return this.players
  }

  private elaborateNightResults(){
    // let players: any[] = this.players
    let wolvesVotes = []
    let shielded

    this.players.forEach(player => {
      const votedFor = player.votedFor
      switch (player.role.name) {
        case 'wolf':
          wolvesVotes.push(this.players.find(player => player.id === votedFor))
          break;

        case 'protector':
          shielded = this.players.find(player => player.id === votedFor)
          break;

        case 'seer':
          let i = this.players.findIndex(player => player.id === votedFor)
          this.players[i].seenBySeer = true;
          break;
      }
    });

    //elaborate Wolves
    const wolvesVoteCount: Record<string, number> = {};
    wolvesVotes.forEach(player => {
      if(player.id in wolvesVoteCount){
        wolvesVoteCount[player.id]++;
      }else{
        wolvesVoteCount[player.id] = 1;
      }
    });
    let highestVoteCount = 0;
    let mostVotedPlayerIdWolves: string;

    Object.entries(wolvesVoteCount).forEach(([playerId, voteCount]) => {
      if (voteCount > highestVoteCount) {
        mostVotedPlayerIdWolves = playerId;
        highestVoteCount = voteCount;
      }
    });

    if(mostVotedPlayerIdWolves !== shielded){
      let wolvesVictim = this.players.find(player => player.id === mostVotedPlayerIdWolves)
      wolvesVictim.role.nightLifes -= 1
      if(wolvesVictim.role.nightLifes === 0){
        wolvesVictim.kill('wolf')
      }
    }
    return this.players
  }

  private elaborateDayResults(){
    const voteCount: Record<string, number> = {};
      this.players.forEach((player) => {
        const votedPlayer = player.votedFor;
        if (votedPlayer in voteCount) {
          voteCount[votedPlayer]++;
        } else {
          voteCount[votedPlayer] = 1;
        }
      });

      let highestVoteCount = 0;
      let mostVotedPlayerId: string;

      Object.entries(voteCount).forEach(([playerId, voteCount]) => {
        if (voteCount > highestVoteCount) {
          mostVotedPlayerId = playerId;
          highestVoteCount = voteCount;
        }
      });

      return this.players.find((player) => player.id === mostVotedPlayerId)
  }

  setVote(playerId: string, voteForId: string){
    let player = this.players.find(player => player.id === playerId)
    player.votedFor = voteForId
  }

  nextTrunName(){
    let nextRoleTurnIndex = this.roles.findIndex(role => role.name === this.turnName) + 1
    if(nextRoleTurnIndex >= this.roles.length){
      this.isNight = false;
    }else{
      this.turnName = this.roles[nextRoleTurnIndex].name
    }

    return this.isNight

  }

}


