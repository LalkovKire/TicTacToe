import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GameAction, GameState } from '../model/gameState';
import { INITAL_GAME_STATE } from '../model/mock-state';

@Injectable({
  providedIn: 'root'
})
export class TileServiceService {

  private state : BehaviorSubject<GameState>; 

  // tile designated for animation
  private clickedTile = new BehaviorSubject<boolean>(false);
  public clickedTileObserver$ : Observable<boolean> = this.clickedTile.asObservable();
  
  constructor() {
    this.state = new BehaviorSubject<GameState>(INITAL_GAME_STATE);
  }

  getState() : Observable<GameState> {
    return this.state.asObservable();
  }

  updateGameTable(currentState : GameState, tileNumber: number) : void {
    if (currentState.currentPlayer === 1) {
      this.state.next({
        ...currentState,
        currentPlayer: 2,
        gameStats: [...currentState.gameStats.slice(0,tileNumber), 1, ...currentState.gameStats.slice(tileNumber + 1)]
      })
    } else {
      this.state.next({
        ...currentState,
        currentPlayer: 1,
        gameStats: [...currentState.gameStats.slice(0,tileNumber), 2, ...currentState.gameStats.slice(tileNumber + 1)]
      })
    }
    this.checkForWinner(this.state.value);
  }

  checkForWinner(currentState : GameState) : void {

      let tmpGameStats = currentState.gameStats;
      // Horizontal iteration 
      for (let i=0;i<9;i+=3) {
        let tileValue = tmpGameStats[i];
          if ((tileValue == 1 || tileValue == 2) && tileValue == tmpGameStats[i+1] && tileValue == tmpGameStats[i+2]) {
            this.state.next({
              ...currentState,
              gameAction: GameAction.ENDED,
              winner: tileValue,
              winningTiles: [i,i+1,i+2]
            })
            this.updatePlayerScore(this.state.value,tileValue)
            return;
          }
      }
      // Vertical iteration 
      for (let i=0;i<3;i++) {
        let tileValue = tmpGameStats[i];
          if ((tileValue == 1 || tileValue == 2) && tileValue == tmpGameStats[i+3] && tileValue == tmpGameStats[i+6]){
            this.state.next({
              ...currentState,
              gameAction: GameAction.ENDED,
              winner: tileValue,
              winningTiles: [i,i+3,i+6]
            })
            this.updatePlayerScore(this.state.value,tileValue);
            return;
          } 
      }
      // Diagonals
      let leftDiagonal = tmpGameStats[0];
      let rightDiagonal = tmpGameStats[2]; 
      if (leftDiagonal == 1 || leftDiagonal == 2) {
        if (leftDiagonal == tmpGameStats[4] && leftDiagonal == tmpGameStats[8]) { 
          this.state.next({
            ...currentState,
            gameAction: GameAction.ENDED,
            winner: leftDiagonal,
            winningTiles: [0,4,8]
          })
          this.updatePlayerScore(this.state.value,leftDiagonal);
          return;
        }
      }
      if (rightDiagonal == 1 || rightDiagonal == 2) {
        if (rightDiagonal == tmpGameStats[4] && rightDiagonal == tmpGameStats[6]) {
          this.state.next({
            ...currentState,
            gameAction: GameAction.ENDED,
            winner: rightDiagonal,
            winningTiles: [2,4,6]
          })
          this.updatePlayerScore(this.state.value,rightDiagonal);
          return;
        }
      }
      // No remaining tiles left
      if (tmpGameStats.every(tile => tile !== 3)) {
        this.state.next({
          ...currentState,
          gameAction: GameAction.ENDED,
          winner: 4
        })
        return;
      }
      // Default no winner , continue
      this.state.next({
        ...currentState,
        winner: 3
      })
  }
  // resets state to starting values except scores. 
  resetGame(currentState: GameState) : void {
    this.state.next({
      ...currentState,
      gameStats: Array(9).fill(3),
      gameAction: GameAction.START,
      currentPlayer: 1,
      clickedTile: false,
      winner: 3,
      winningTiles: []
    })
    this.clickedTile.next(false);
  }

  updatePlayerScore(currentState: GameState, winner : number) : void {
    let arr = [...currentState.playerScores];
    if (winner == 1) {
      arr[0] = arr[0] + 1;
    } else {
      arr[1] = arr[1] + 1;
    }
    this.state.next({
      ...currentState,
      playerScores: arr
    })  
  }

}
