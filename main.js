import XOGame from './XO.js';
const game = new XOGame();
const boardContainer = document.getElementById("boardContainer");
const nextPlayerContainer = document.getElementById("nextPlayerContainer");
renderPage();
function renderPage() {
    boardContainer.innerHTML = "";
    setBoard();
    setEvents();
    if (game.gameWinner === "")
        setnextPlayerContainer();
    else
        anounceEndOfGameStatuse();

}
function setBoard() {
    game.board.forEach(row => {
        row.forEach(piece => {
            const currentPieceTeamDiv = document.createElement('div');
            const teamType = piece.getTeam();
            if (teamType === "blue")
                currentPieceTeamDiv.className = "blue-circle";
            if (teamType === "none")
                currentPieceTeamDiv.className = "none";
            if (teamType === "red") {
                currentPieceTeamDiv.className = "red-container";
                const xFirstPart = document.createElement('div');
                xFirstPart.className = "x-part1";
                currentPieceTeamDiv.appendChild(xFirstPart);
                const xSecondPart = document.createElement('div');
                xSecondPart.className = "x-part2";
                currentPieceTeamDiv.appendChild(xSecondPart);
            }
            currentPieceTeamDiv.setAttribute('id', piece.id);
            const currentPieceDiv = document.createElement('div');
            currentPieceDiv.className = "game-piece";
            currentPieceDiv.appendChild(currentPieceTeamDiv);
            boardContainer.appendChild(currentPieceDiv);
        })

    });
}
function setnextPlayerContainer() {
    nextPlayerContainer.className = "nextPlayerContainer";
    let nextPlayerMessage = (game.isBluePlayerTurn) ? "Blue" : "Red";
    nextPlayerMessage += " make your move";
    nextPlayerContainer.innerHTML = nextPlayerMessage;
    nextPlayerContainer.classList.add(game.isBluePlayerTurn ? "blue" : "red");

}
function anounceEndOfGameStatuse() {
    alert((game.gameWinner === 'none') ? "It's a draw!" : (game.gameWinner === "blue" ? "Blue Won!" : "Red Won!"));
}
function setEvents() {
    game.board.forEach(row => {
        row.forEach(piece => {
            const currentPieceId = piece.id;
            const currentPieceContainer = document.getElementById(currentPieceId);
            currentPieceContainer.addEventListener('click', (event) => {
                game.nextMove(event.target.id);
                renderPage();
                // let gameStatusMessage = newGame.getGameResponseAfterClick(event.target.id);
            })
        })
    })
}