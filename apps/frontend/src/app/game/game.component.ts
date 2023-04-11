import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { Game } from '../api-interfaces/game';
import { Player } from '../api-interfaces/player';
import { GameService } from '../services/game.service';
import { GameSocket } from '../services/game.socket';
import { NotificationService } from '../shared/notification.service';
import { PlayerService } from '../services/player.service';
import { PlayerSelectionModalComponent } from './player-selection-modal/player-selection-modal.component';


@Component({
  selector: 'websocket-poc-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  host: {
    class: 'child-container'
  }
})
export class GameComponent implements OnInit {
  isGameMaster = this.playerService.player?.isGameMaster
  players: Player[] = []
  game?: Game

  isMyNightTurn = false;
  isYourNightTurnSub?: Subscription

  constructor(
    public gameService: GameService,
    private playerService: PlayerService,
    private dialog: MatDialog,
    private notificationService: NotificationService
  ){
    console.log(this.isGameMaster);

  }

  ngOnInit(): void {
    this.gameService.getGame().subscribe({
      next: (game: Game) => {
          console.log(game);
          this.game = game
          this.players = game.players!
          this.playerService.player = this.players.find(player => player.socketId === this.playerService.socketId)
          if(this.playerService.player?.role !== null){
            this.subscribeToYourNightTurn()
          }
      },
    })

    this.gameService.joinGame(this.gameService.roomId!, this.playerService.player!)
  }

  nextPhase(){
    this.gameService.nextPhase()
  }

  playerClicked(player: Player){
    //TODO: add modal confirmation
    const isNight = this.gameService.game?.gamePhase.isNight
    if(player.id === this.playerService.player?.id){
      this.notificationService.openNotification('Questo sei tu, COGLIONE!!', `il tuo ruolo è ${this.playerService.player?.role.name}`)
      return;
    }

    if(!isNight || (isNight && this.isMyNightTurn)){
      this.dialog.open(PlayerSelectionModalComponent, {
        data: player,
        enterAnimationDuration: '500ms',
        exitAnimationDuration: '500ms'
      }).afterClosed().subscribe(confirmed => {
          console.log('confirmed: ', confirmed);

          if(this.gameService.game?.gamePhase.isNight && this.isMyNightTurn){
            this.gameService.executeNightAction(player.id!, this.playerService.player!)
          }else if(!this.gameService.game?.gamePhase.isNight){
            this.gameService.voteDay(player.id!, this.playerService.player!)
          }
      })
    }else{
      this.notificationService.openNotification('NON BARARE!!!', 'Non è il tuo turno')
    }




  }

  subscribeToYourNightTurn(){
    this.isYourNightTurnSub = this.gameService.isMyNightTurn(this.playerService.player?.role.name).subscribe({
      next: (isMyNigthTurn: boolean) => {
        this.isMyNightTurn = isMyNigthTurn;
      }
    })
  }
}
