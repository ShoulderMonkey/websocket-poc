import { Player } from "./player";

export interface Game{
  id?: string;
  players?: Player[]
  maxPlayers?: number;
  gameMaster?: Player;
}
