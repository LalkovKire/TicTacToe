import { NgFor, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SingleTileComponent } from './single-tile/single-tile.component';
import { TileServiceService } from './services/tile-service.service';
import { MatDialog, MAT_DIALOG_DATA,MatDialogTitle,MatDialogContent} from '@angular/material/dialog';
// TODO - Implement dialog for winner notification. 
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgFor, NgIf, SingleTileComponent, MatDialogContent, MatDialogTitle],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

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
        }
        if (s == 1){
          this.winnerName = "Player X";
        } else if ( s == 2) {
          this.winnerName = "Player O";
        } else if ( s == 4 ) {
          this.winnerName = "Draw";
        } else this.checkWinner = false;
      });
      this.service.playerScoreObserver$.subscribe(s => this.scores = s);
  }

  ngOnInit(): void {
    for (let i=0;i<9;i++) this.counter.push(i);
  }

  public newGame() {
    this.service.resetGame();
  }
  
}
