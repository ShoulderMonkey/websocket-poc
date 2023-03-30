import { GamePhase } from "./gamePhase";
import { Player } from "./player";
import { Role } from "./role";

export interface Game{
  roles: Role[]
  id: string;
  players: Player[]
  maxPlayers: number;
  minPlayers: number;
  gameMaster: Player;
  gamePhase: GamePhase;

}
