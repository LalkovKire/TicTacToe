import { Component, Inject, OnInit } from '@angular/core';
import { TileServiceService } from '../services/tile-service.service';
import { SingleTileComponent } from '../single-tile/single-tile.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogRef, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [CommonModule, SingleTileComponent, MatDialogActions],
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.css'
})
export class GameBoardComponent implements OnInit {

  counter: number[] = [];
  playerTurn: String = "Player X";
  checkWinner: boolean = false;
  winnerName: string = "";
  scores: number[] = [];

  constructor(private service: TileServiceService, public dialog: MatDialog){
      this.service.currentPlayerObserver$.subscribe(s =>  {
        if (s == 1) this.playerTurn = "Player X";
        else this.playerTurn = "Player O";
      });
      this.service.winnerObserver$.subscribe(s => {
        if ( s != 3 ) {
          this.checkWinner = true;
          this.getWinnerName(s);
          this.openDialog('500ms', '500ms'); 
        }
      });
      this.service.playerScoreObserver$.subscribe(s => this.scores = s);
  }

  ngOnInit(): void {
    for (let i=0;i<9;i++) this.counter.push(i);
  }

  getWinnerName(s : any) {
    if (s == 1){
      this.winnerName = "Player X"; 
    } else if ( s == 2) {
      this.winnerName = "Player O";
    } else if ( s == 4 ) {
      this.winnerName = "Draw";
    } else this.checkWinner = false;
  }
  
  newGame() {
    this.service.resetGame();
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string) {
    this.dialog.open(DialogDataExampleDialog, {
      width: "450px", 
      data: {
        winnerName: this.winnerName,
      },
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

}

@Component({
  selector: 'dialog-data-example-dialog',
  templateUrl: 'dialog-data.html',
  styleUrl: 'dialog-data.css',
  standalone: true,
  imports: [MatDialogActions,MatDialogClose, MatButtonModule, MatDialogContent, MatDialogTitle],
})
export class DialogDataExampleDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<DialogDataExampleDialog>) {}
}
