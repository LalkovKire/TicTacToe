import { CommonModule, NgClass } from '@angular/common';
import { Component, Input, NgModule, OnInit } from '@angular/core';
import { TileServiceService } from '../services/tile-service.service';

@Component({
  selector: 'app-single-tile',
  standalone: true,
  imports: [CommonModule,NgClass],
  templateUrl: './single-tile.component.html',
  styleUrl: './single-tile.component.css'
})
export class SingleTileComponent {

  tileIsClicked : boolean = false;
  showX : boolean = false;
  currentPlayer : number = 1;
  gameAction : string = "";
  winningTiles: number[] = [];
  tileIsWinner : boolean = false;
  @Input() tileNumber : number = 0;

  constructor(private service: TileServiceService){
    this.service.gameActionObserver$.subscribe(s => this.gameAction = s);
    this.service.clickedTileObserver$.subscribe(s => this.tileIsClicked = s);
    this.service.currentPlayerObserver$.subscribe(s => this.currentPlayer = s);
    this.service.winningTiles$.subscribe(s => {
      this.winningTiles = s;
      this.tileIsWinner = this.winningTiles.includes(this.tileNumber);
    });
  }

  playerClick() {
    if (this.tileIsClicked || this.gameAction == "ENDED") return;
    else {
      this.tileIsClicked = true;
      if (this.currentPlayer == 1) {
        this.showX = true;
        this.service.updateTable(this.tileNumber);
      } else {
        this.showX = false;
        this.service.updateTable(this.tileNumber);
      }
    }
  }
}
