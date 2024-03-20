import { Component, Inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle, MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: 'dialog-data-example-dialog',
    templateUrl: 'game-dialog.component.html',
    styleUrl: 'game-dialog.component.css',
    standalone: true,
    imports: [MatDialogActions,MatDialogClose, MatButtonModule, MatDialogContent, MatDialogTitle],
  })
  export class GameDialog {
    constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<GameDialog>) {}
  }