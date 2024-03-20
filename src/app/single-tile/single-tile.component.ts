import { NgClass } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TileServiceService } from '../services/tile-service.service';
import { GameAction, GameState } from '../model/gameState';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-single-tile',
  standalone: true,
  imports: [NgClass],
  templateUrl: './single-tile.component.html',
  styleUrl: './single-tile.component.css'
})
export class SingleTileComponent implements OnInit, OnDestroy {

  private gameStateSubscription!: Subscription; 
  private clickedTileSubscription! : Subscription; 
  gameState!: GameState;
  tileIsClicked!: boolean;
  showX!: boolean;
  tileIsWinner! : boolean;
  @Input() tileNumber!: number;

  constructor(private service: TileServiceService){
  }

  ngOnInit(): void {
    this.gameStateSubscription = this.service.getState().subscribe( (s : GameState) => {
      this.gameState = s;
      this.tileIsWinner = this.gameState.winningTiles.includes(this.tileNumber);
    })
    this.clickedTileSubscription = this.service.clickedTileObserver$.subscribe( (tile : boolean ) => this.tileIsClicked = tile);
    this.showX = false;
  }

  playerClick() : void {
    if ( this.tileIsClicked || this.gameState.gameAction === GameAction.ENDED ) return;
    else {
      this.tileIsClicked = true;
      if (this.gameState.currentPlayer === 1 ) {
        this.showX = true;
        this.service.updateGameTable(this.gameState,this.tileNumber);
      } else {
        this.showX = false;
        this.service.updateGameTable(this.gameState,this.tileNumber);
      }
    }
  }

  ngOnDestroy(): void {
    this.gameStateSubscription.unsubscribe();
    this.clickedTileSubscription.unsubscribe();
  }
}
