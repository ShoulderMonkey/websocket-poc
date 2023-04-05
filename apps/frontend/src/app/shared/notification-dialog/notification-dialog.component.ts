import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface NotificationDialogInput{
  title:string;
  text: string;
}

@Component({
  selector: 'websocket-poc-notification-dialog',
  templateUrl: './notification-dialog.component.html',
  styleUrls: ['./notification-dialog.component.scss']
})
export class NotificationDialogComponent implements OnInit {
  title?: string;
  text?: string;

  constructor(
    public dialogRef: MatDialogRef<NotificationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NotificationDialogInput,
    ){}

  ngOnInit(): void {
    this.title = this.data.title
    this.text = this.data.text

    console.log(this.title);
    console.log(this.text);

    setTimeout(() => {
      this.closeDialog()
    }, 3000);
  }

  closeDialog(){
    this.dialogRef.close()
  }
}
