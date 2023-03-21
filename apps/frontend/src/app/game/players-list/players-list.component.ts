import { Component, Input } from '@angular/core';
import { Player } from '../../api-interfaces/player';

@Component({
  selector: 'websocket-poc-players-list',
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.scss']
})
export class PlayersListComponent {
  @Input()players!: Player[]

  playerClicked(player: Player){
    console.log(player);
  }
}
