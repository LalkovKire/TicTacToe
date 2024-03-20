/* Number representation of game stats
    1 - Player X
    2 - Player O 
    3 - Empty Tile
    --------------------------------------
    4 - Draw ( applicable only to winner )
*/

export interface GameState {
    gameStats: number[];
    gameAction: GameAction;
    currentPlayer: number;
    winner: number;
    clickedTile: boolean;
    playerScores: number[];
    winningTiles: number[];
}

export enum GameAction {
    'START',
    'ENDED'
}