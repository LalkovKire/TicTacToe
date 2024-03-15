import { CommonModule } from '@angular/common';
import { Component, Input, NgModule, OnInit } from '@angular/core';
import { TileServiceService } from '../services/tile-service.service';

@Component({
  selector: 'app-single-tile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './single-tile.component.html',
  styleUrl: './single-tile.component.css'
})
export class SingleTileComponent {

  tileIsClicked : boolean;
  showX : boolean;
  currentPlayer : number;
  gameAction : string;
  @Input() tileNumber : number;

  constructor(private service: TileServiceService){
    this.tileIsClicked = false;
    this.showX = false;
    this.gameAction = "";
    this.currentPlayer = 1;
    this.tileNumber = 0;
    this.service.gameActionObserver$.subscribe(s => this.gameAction = s);
    this.service.clickedTileObserver$.subscribe(s => this.tileIsClicked = s);
    this.service.currentPlayerObserver$.subscribe(s => this.currentPlayer = s);
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
