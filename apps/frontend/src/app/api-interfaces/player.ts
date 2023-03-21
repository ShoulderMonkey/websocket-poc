export interface Player{
  id?: string;
  name?: string;
  socketId?: string;
  role?: any //TODO: create Role class
  isGameMaster?: boolean;
  isAlive?: boolean;
  killedBy?: string;
}
