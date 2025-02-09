import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Player } from '../../api-interfaces/player';

@Component({
  selector: 'websocket-poc-players-list',
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.scss']
})
export class PlayersListComponent {
  @Input()players!: Player[]
  @Output() playerClickedEvent: EventEmitter<Player> = new EventEmitter()

  playerClicked(player: Player){
    this.playerClickedEvent.emit(player)
  }
}
