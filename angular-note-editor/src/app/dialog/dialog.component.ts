import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogService } from './shared/dialog.service';


export interface DialogData {
  type: number,
  title: string,
  field: string,
  button: string
}


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  infoMessage = '';

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,private dialogService : DialogService) {}

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClick(type : number, field: string): void {
    switch (type) {
      case 0:
          this.dialogService.createFolder(field).subscribe(
            (data) => {
              this.dialogRef.close();
            },
            (err) => {
              this.infoMessage = err.error;
            });
          break;
      case 1:
        this.dialogService.deleteFolder(field).subscribe(
          (data) => {
            this.dialogRef.close();
          },
          (err) => {
            this.infoMessage = err.error;
          });
          break;
      case 2:
        this.dialogService.createFile(field).subscribe(
          (data) => {
            this.dialogRef.close();
          },
          (err) => {
            this.infoMessage = err.error;
          });
          break;
      case 3:
        this.dialogService.deleteFile(field).subscribe(
          (data) => {
            this.dialogRef.close();
          },
          (err) => {
            this.infoMessage = err.error;
          });
          break;
    }
  }
}
