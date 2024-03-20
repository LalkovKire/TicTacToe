import { GameAction, GameState } from "./gameState";

export const INITAL_GAME_STATE : GameState = {
    gameStats: Array(9).fill(3),
    gameAction: GameAction.START,
    currentPlayer: 1,
    winner: 3,
    clickedTile: false,
    playerScores: [0,0],
    winningTiles: []
}