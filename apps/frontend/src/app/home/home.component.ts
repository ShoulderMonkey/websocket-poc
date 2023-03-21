import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Player } from '../api-interfaces/player';
import { GameService } from '../services/game.service';

import { PlayerService } from '../services/player.service';

@Component({
  selector: 'websocket-poc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private playerService: PlayerService,
    private gameService: GameService,
    private route: Router){
    this.form = this.fb.group({
      name: [null],
      roomId: [null]
    })
  }

  createPlayer(){
    this.playerService.createPlayer(this.form.get('name')?.value).subscribe((player: Player)=> {
      console.log(player);
      this.playerService.player = player
    })
  }

  joinGame(){
    this.gameService.roomId = this.form.get('roomId')?.value
    this.route.navigate(['game'])
  }

  createGame(){
    this.playerService.createGame(this.playerService.player?.id!).subscribe((roomId: string) => {
      console.log(roomId);
      this.gameService.roomId = roomId
      this.route.navigate(['game'])
    })
  }
}
