export default class XOGame {
    constructor() {
        this.isBluePlayerTurn = true,
            this.board = [[new GamePiece(), new GamePiece(), new GamePiece()],
            [new GamePiece(), new GamePiece(), new GamePiece()],
            [new GamePiece(), new GamePiece(), new GamePiece()]],
            this._nextPlayerMove = "";
        this._gameWinner = "";
    }
    nextMove(clickedPieceId) {
        console.log(this.board)
        const currentPlayerColor = (this.isBluePlayerTurn) ? "blue" : "red";
        let currentPieceClicked = this.getPieceById(clickedPieceId);
        if (!(currentPieceClicked.isEmptyPiece()))
            return;
        this.nextPlayerMove = currentPieceClicked;
        this.nextPlayerMove.setTeam(currentPlayerColor);
        if (this.isPlayerWon(currentPlayerColor)) {
            this._gameWinner = currentPlayerColor;
            return
        }
        if (this.isDraw()) {
            this._gameWinner = "none";
        }
        this.setNextPlayerTurn();
        return;
    }
    getPieceById(clickedPieceId) {
        let currentPiece = this.board[0, 0];
        this.board.forEach(row => {

            row.forEach(piece => {
                if (piece.id === clickedPieceId)
                    currentPiece = piece;
            })
        });
        console.log(currentPiece.id, clickedPieceId)
        return currentPiece;
    }
    set gameWinner(color) {
        this._gameWinner = color;
    }
    get gameWinner() {
        return this._gameWinner;
    }
    setNextPlayerTurn() {
        this.isBluePlayerTurn = (this.isBluePlayerTurn) ? false : true;
    }
    isPlayerWon(currentPlayerColor) {
        if (this.board[0][0].getTeam() === currentPlayerColor && this.board[0][1].getTeam() === currentPlayerColor && this.board[0][2].getTeam() === currentPlayerColor)
            return true;
        if (this.board[1][0].getTeam() === currentPlayerColor && this.board[1][1].getTeam() === currentPlayerColor && this.board[1][2].getTeam() === currentPlayerColor)
            return true;
        if (this.board[2][0].getTeam() === currentPlayerColor && this.board[2][1].getTeam() === currentPlayerColor && this.board[2][2].getTeam() === currentPlayerColor)
            return true;
        if (this.board[0][0].getTeam() === currentPlayerColor && this.board[1][0].getTeam() === currentPlayerColor && this.board[2][0].getTeam() === currentPlayerColor)
            return true;
        if (this.board[0][1].getTeam() === currentPlayerColor && this.board[1][1].getTeam() === currentPlayerColor && this.board[2][1].getTeam() === currentPlayerColor)
            return true;
        if (this.board[0][2].getTeam() === currentPlayerColor && this.board[1][2].getTeam() === currentPlayerColor && this.board[2][2].getTeam() === currentPlayerColor)
            return true;
        if (this.board[0][0].getTeam() === currentPlayerColor && this.board[1][1].getTeam() === currentPlayerColor && this.board[2][2].getTeam() === currentPlayerColor)
            return true;
        if (this.board[2][0].getTeam() === currentPlayerColor && this.board[1][1].getTeam() === currentPlayerColor && this.board[0][2].getTeam() === currentPlayerColor)
            return true;
        return false;
    }
    isDraw() {
        let foundEmptySquare = false;
        for (let i = 0; i < this.board.length && !foundEmptySquare; i++) {
            for (let j = 0; j < this.board.length && !foundEmptySquare; j++) {
                if (this.board[i][j].getTeam() === "none")
                    foundEmptySquare = true;
            }
        }
        return (foundEmptySquare) ? false : true;
    }

}
class GamePiece {
    constructor(color = "none") {
        GamePiece.piecesCounter++;
        this._team = color;
        this.id = "#" + GamePiece.piecesCounter;

    }
    setTeam(teamColor) {
        this._team = teamColor;
    }
    getTeam() {
        return this._team;
    }
    isEmptyPiece() {
        return this._team === "none";
    }
}
GamePiece.piecesCounter = 0;
