import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TileServiceService {

  private gameStats : number[] = Array(9).fill(3);
  private clickedTile = new BehaviorSubject<boolean>(false);
  private gameAction = new BehaviorSubject<string>("START");
  private currentPlayer = new BehaviorSubject<number>(1);
  private winner = new BehaviorSubject<number>(3);
  private playerScores = new BehaviorSubject<number[]>([0,0]);

  public playerScoreObserver$ : Observable<number[]> = this.playerScores.asObservable();
  public clickedTileObserver$ : Observable<boolean> = this.clickedTile.asObservable();
  public gameActionObserver$ : Observable<string> = this.gameAction.asObservable();
  public currentPlayerObserver$ : Observable<number> = this.currentPlayer.asObservable();
  public winnerObserver$ : Observable<number> = this.winner.asObservable();
  
  constructor() {
  }

  public updateTable(tileNumber: number) : void {
    if (this.currentPlayer.value == 1) {
      this.currentPlayer.next(2);
      this.gameStats[tileNumber] = 1;
    }  
    else {
      this.currentPlayer.next(1);
      this.gameStats[tileNumber] = 2;
    } 
    this.checkForWinner();
  }

  public checkForWinner() : void {
      // Horizontal iteration 
      for (let i=0;i<9;i+=3) {
        let tmp = this.gameStats[i];
          if ((tmp == 1 || tmp == 2) && tmp == this.gameStats[i+1] && tmp == this.gameStats[i+2]) {
            this.gameAction.next("ENDED");
            this.winner.next(tmp);
            console.log("hori", tmp);
            this.updateScore(tmp);
            return;
          }
      }
      // Vertical iteration 
      for (let i=0;i<3;i++) {
        let tmp = this.gameStats[i];
          if ((tmp == 1 || tmp == 2) && tmp == this.gameStats[i+3] && tmp == this.gameStats[i+6]){
            this.gameAction.next("ENDED");
            this.winner.next(tmp);
            console.log("vertical",tmp);
            this.updateScore(tmp);
            return;
          } 
      }
      // Diagonals
      let leftDiagonal = this.gameStats[0];
      let rightDiagonal = this.gameStats[2]; 
      if (leftDiagonal == 1 || leftDiagonal == 2) {
        if (leftDiagonal == this.gameStats[4] && leftDiagonal == this.gameStats[8]) { 
          this.gameAction.next("ENDED");
          this.winner.next(leftDiagonal);
          console.log("left", leftDiagonal);
          this.updateScore(leftDiagonal);
          return;
        }
      }
      if (rightDiagonal == 1 || rightDiagonal == 2) {
        if (rightDiagonal == this.gameStats[4] && rightDiagonal == this.gameStats[6]) {
          this.gameAction.next("ENDED");
          this.winner.next(rightDiagonal);
          console.log("Right", rightDiagonal);
          this.updateScore(rightDiagonal);
          return;
        }
      }
      if (this.gameStats.every(tile => tile !== 3)) {
          this.gameAction.next("ENDED");
          this.winner.next(4); 
          return;
      }
      this.winner.next(3);
  }

  public resetGame() {
    this.gameStats = Array(9).fill(3);
    this.gameAction.next("START");
    this.clickedTile.next(false);
    this.currentPlayer.next(1);
    this.winner.next(3);
  }

  public updateScore(tmp : number) {
    if (tmp == 1) {
      let arr = [...this.playerScores.value];
      arr[0] = arr[0] + 1;
      this.playerScores.next(arr);
    } else {
      let arr = [...this.playerScores.value];
      arr[1] = arr[1]+ 1;
      this.playerScores.next(arr);
    }
  }

}
