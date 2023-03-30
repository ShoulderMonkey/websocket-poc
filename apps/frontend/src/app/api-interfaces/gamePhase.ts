import { Player } from "./player";

export interface GamePhase {
  isNight: boolean;
  players: Player[];
  isOver: boolean
}
