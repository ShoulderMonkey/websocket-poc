import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Player } from '../../api-interfaces/player';

@Component({
  selector: 'websocket-poc-player-selection-modal',
  templateUrl: './player-selection-modal.component.html',
  styleUrls: ['./player-selection-modal.component.scss']
})
export class PlayerSelectionModalComponent implements OnInit {

  player!: Player

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PlayerSelectionModalComponent>
  ){
  }

  ngOnInit(): void {
    console.log(this.data);
    this.player = this.data
  }


  closeDialog(confirm: boolean){
    this.dialogRef.close(confirm)
  }
}
