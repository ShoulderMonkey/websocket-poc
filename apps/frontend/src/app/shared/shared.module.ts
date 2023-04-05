import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationDialogComponent } from './notification-dialog/notification-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NotificationService } from './notification.service';

export const MATERIAL_MODULES = [
  MatDialogModule
]

@NgModule({
  declarations: [
    NotificationDialogComponent
  ],
  imports: [
    CommonModule,
    ...MATERIAL_MODULES
  ],
  providers: [NotificationService]
})
export class SharedModule { }
