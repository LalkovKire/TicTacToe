import { Component, OnDestroy, OnInit } from '@angular/core';
import { TileServiceService } from '../services/tile-service.service';
import { SingleTileComponent } from '../single-tile/single-tile.component';
import { MatDialog, MatDialogActions} from '@angular/material/dialog';
import { GameState } from '../model/gameState';
import { GameDialog } from '../game-dialog/game-dialog.component';
import { Subscription } from 'rxjs';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [SingleTileComponent, MatDialogActions, NgClass],
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.css',
})
export class GameBoardComponent implements OnInit, OnDestroy {

  private gameStateSubscription!: Subscription; 
  counter: number[];
  gameState!: GameState;
  checkWinner: boolean;
  winnerName: string;
  gameContainerAnimations: 'zoomIn' | 'zoomOut' | undefined;

  constructor(private service: TileServiceService, private dialog: MatDialog){
    this.checkWinner = false;
    this.winnerName = "";
    this.counter = [];
    this.gameContainerAnimations = undefined;
  }

  ngOnInit() : void {
    for (let i=0;i<9;i++) this.counter.push(i);
    this.gameStateSubscription = this.service.getState().subscribe( (s : GameState) => {
      this.gameState = s;
      if (s.winner != 3 && !this.checkWinner) {
        this.checkWinner = true;
        this.getWinnerName(s.winner);
        this.openDialog('500ms','500ms');
      }
    })
  }

  getWinnerName(winner : number) : void {
    if (winner == 1){
      this.winnerName = "Player X"; 
    } else if ( winner == 2) {
      this.winnerName = "Player O";
    } else if ( winner == 4 ) {
      this.winnerName = "Draw";
    } else this.checkWinner = false;
  }
  
  newGame() : void {
    this.service.resetGame(this.gameState);
    this.checkWinner = false;
    this.gameContainerAnimations = 'zoomOut'; 
    setTimeout(() => {
      this.service.resetGame(this.gameState);
      this.checkWinner = false;
      this.gameContainerAnimations = 'zoomIn'; 
    }, 500);
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string) : void {
    this.dialog.open(GameDialog, {
      width: "450px", 
      data: {
        winnerName: this.winnerName,
      },
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  ngOnDestroy() : void {
    this.gameStateSubscription.unsubscribe(); 
  }
}
