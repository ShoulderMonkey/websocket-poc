import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Player } from '../../api-interfaces/player';

@Component({
  selector: 'websocket-poc-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss']
})
export class PlayerCardComponent implements OnChanges {

  @Input()player!: Player
  @Input()showPlayerRole: boolean = false;

  @Output()clicked: EventEmitter<Player> = new EventEmitter()

  playerRoleImage?: string;
  constructor(){

  }

  ngOnChanges(changes: SimpleChanges): void {
      this.playerRoleImage = ''//`../../../asset/roles/${this.player.role.name}`
  }

  cardClicked(){
    this.clicked.emit(this.player)
  }
}
