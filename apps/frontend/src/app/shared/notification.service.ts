import { DialogRef } from "@angular/cdk/dialog";
import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { NotificationDialogComponent } from "./notification-dialog/notification-dialog.component";

@Injectable()
export class NotificationService {

  constructor(private dialog: MatDialog){}

  openNotification(title: string, text: string){
    this.dialog.open(NotificationDialogComponent, {
      data: {
        title: title,
        text: text
      },
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms'
    })
  }
}
