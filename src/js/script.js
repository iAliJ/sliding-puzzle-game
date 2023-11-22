//#region Event listeners

// New game button
let newGameBtn = document.querySelector('#new-game');
newGameBtn.addEventListener('click', newGameHandler);

// Tiles click listner
let selectedTile = document.querySelectorAll('.pzTile').forEach(function(tile) {
    tile.addEventListener('click', function(){
        moveTile(tile);
    });
});

// Giveup button
document.querySelector('#pzGiveupBtn').addEventListener('click', giveUp);

//#endregion

tilesArraySolution = [
    {'id': 1, 'position': 0},
    {'id': 2, 'position': 1},
    {'id': 3, 'position': 2},
    {'id': 4, 'position': 3},
    {'id': 5, 'position': 4},
    {'id': 6, 'position': 5},
    {'id': 7, 'position': 6},
    {'id': 8, 'position': 7},
    {'id': 'empty', 'position': 8}
];

// Global variables
let tilesArray, p1Score, p2Score, currentPlayer, currentRound, emptyTile;

function resetGameArray() {
    tilesArray = copyArray(tilesArraySolution);
}

// Array to store positions and adjacent tiles
let legalMoves=[
    [1,3], //0
    [0,2,4], //1
    [1,5], //2
    [0,4,6], //3
    [1,3,5,7], //4
    [2,4,8], //5
    [3,7], //6
    [4,6,8], //7
    [5,7] //8
]

function copyArray(arr) {
    return JSON.parse(JSON.stringify(arr));
}

function getEmptyTilePosition() {
    for(let i = 0; i < tilesArray.length; i++) {
        if (tilesArray[i].id === 'empty') {
            return tilesArray[i].position;
        }
    }
    return -1;
}

function setEmptyTilePosition(position) {
    for(let i = 0; i < tilesArray.length; i++) {
        if (tilesArray[i].id === 'empty') {
            tilesArray[i].position = position;
            return position;
        }
    }
}

function newGameHandler(e) {
    e.preventDefault();
    // Get all the user settings
    newGame();
}

function newGame() {
        // Get all the user settings
        let nTiles = document.querySelector('#tiles-number').value;

        // Create new canvas based on the settings
        
        // reset all variables to default values
        resetGameArray();
        resetScores();
        emptyTile = getEmptyTilePosition();
        currentPlayer = 'p1';
        currentRound = 1;
        // draw the board and update UI
        updateInfoUI();
        drawBoard();
}

// A function to draw the board UI
function drawBoard() {
    // shuffle the solution array, input is difficulty which is number of shuffes
    shuffleWithDifficulty(4);
    // Initialize the tiles
    initiateTiles();
    // assign the array elements to each tile on the board UI
    tilesArray.forEach(function(element, tileIndex){
        let currentTile = document.querySelector(`.pzTile[data-currentPosition="${tileIndex}"]`);
        currentTile.innerText = element.id;
        currentTile.dataset.currentPosition = tileIndex;
        currentTile.dataset.tileid = element.id;
        
        // If the current tile is empty we need to update the index in the array
        if(currentTile.dataset.tileid == 'empty') {
            emptyTile = setEmptyTilePosition(tileIndex);
        }
    });
}

// Initiate tiles with default values from 1-7
function initiateTiles() {
    document.querySelectorAll('.pzTile').forEach(function(tile, i){
        tile.dataset.currentposition = i;        
    });
}

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle() {
    for(let i = tilesArray.length - 1; i > 0; i--) {
        // get a random index within the array length swap the current position
        let randomIndex = Math.floor(Math.random() * (i + 1));
        let temp = tilesArray[i];
        tilesArray[i] = tilesArray[randomIndex];
        tilesArray[randomIndex] = temp;
    }

    // Update the tilesArray positions
    tilesArray.forEach(function(tileObj, index) {
        tileObj.position = index;
    });
}

function shuffleWithDifficulty(difficulty) {
    let steps = 0;
    for(let i = tilesArray.length - 1; i > 0; i--) {
        // get a random index within the array length swap the current position
        let randomIndex = Math.floor(Math.random() * (i + 1));
        let temp = tilesArray[i];
        tilesArray[i] = tilesArray[randomIndex];
        tilesArray[randomIndex] = temp;
        steps++;
        if(steps == difficulty){
            break;
        }
    }

    // Update the tilesArray positions
    tilesArray.forEach(function(tileObj, index) {
        tileObj.position = index;
    });
}

function moveTile(tile) {
    // get the current tile position and id
    const currentPosition = tile.dataset.currentPosition;
    const tileId = tile.dataset.tileid;
    // check if the selected tile is a valid tile by matching the tile id and position with the solution array
    let isMoveValid = ValidateMove(tileId, currentPosition);
    // if true, move current tile to an empty position by swapping them
    if(isMoveValid) {
        swapTile(tile, tileId, currentPosition);
        // Add 1 score for each move
        addScore(1);
        updateInfoUI();
    }
    else {
        alert("You cant move this tile, silly");
    }
    // Check if the puzzle has been solved
    let isSolved = checkifPuzzleIsSolved();
    if(isSolved == true) {
        alert('We have a winner !');
        // add score to player 1 or 2
        // if game is not over start a new round
        if(!isGameOver()) {
            newRound();
        }
        else {
            let winner = decideWinner(); // Check for the winner
            alert(`${currentPlayer} wins!`);
        }
    }
    else {
        // Nothing happens so far   
    }
}

function decideWinner() {
    // The winner is whoever has less score/moves
    if(p1Score > p2Score) {
        return 'p2';
    }
    return 'p1';
}

function giveUp() {
    // Add penalty points to the current player
    if(!isGameOver()) {
        if(currentPlayer == 'p1') {
            p1Score += 50;
        }
        else {
            p2Score += 50;
        }
        updateInfoUI();
        newRound();
    }
    else {
        alert('Game over');
        newGame();
    }
}

function newRound() {
    resetGameArray();
    emptyTile = getEmptyTilePosition();
    drawBoard();
    // change the current player
    if(currentPlayer === 'p1') {
        currentPlayer = 'p2';
    }
    else {
        // if player 2 had his turn it means we move to the next round
        currentRound++;
        currentPlayer = 'p1';
    }
    updateInfoUI();
}

// Check if the game is over
function isGameOver() {
    // the game is over when 3 rounds have been played and player 2 got his turn completed
    if(currentRound == 3 && currentPlayer == 'p2') {
        return true;
    }
    return false;
}

function addScore(score) {
    // add score to player 1 or player 2 based on a the currentPlayer condition
    if(currentPlayer === 'p1') {
        p1Score += score;
    }
    else {
        p2Score += score;
    }
}

function getCurrentPlayerText() {
    if(currentPlayer == 'p1') {
        return 'Player 1';
    }
    return 'Player 2';
}

function updateInfoUI() {
    document.querySelector('#pzCurrentPlayer').innerText = `Current Player: ${getCurrentPlayerText()}`;
    document.querySelector('#pzP1Score').innerText = `Player 1 score: ${p1Score}`;
    document.querySelector('#pzP2Score').innerText = `Player 2 score: ${p2Score}`;;
    document.querySelector('#pzCurrentRound').innerText = `Current Round: ${currentRound}`;
}

function resetScores() {
    p1Score = 0;
    p2Score = 0;
}

function swapTile(tile, tileId, tilePosition) {
    // swap the position of empty tile and selected tile by using temp variable
    // and update the the index of empty tile
    let temp = emptyTile;
    emptyTile = setEmptyTilePosition(parseInt(tilePosition));
    tilePosition = temp;

    // update the current tile with new position
    updateTilePosition(tileId, tilePosition);
    // update the UI
    updateBoard();
}

function updateBoard() {
    tilesArray.forEach(function(element){
        let currentTile = document.querySelector(`.pzTile[data-currentPosition="${element.position}"]`);
        currentTile.innerText = element.id;
        currentTile.dataset.currentPosition = element.position;
        currentTile.dataset.tileid = element.id;
    });
}

function updateTilePosition(tileId, newPosition) {
    for(let i = 0; i < tilesArray.length; i++) {
        if (tilesArray[i].id == tileId) {
            tilesArray[i].position = newPosition;
            return newPosition;
            }
        }
}

function ValidateMove(tileId, currentPosition) {
    // if selected tile has empty tile id return false
    if(tileId === 'empty') {
        console.log('cannot move an empty tile');
        return false;
    }
    else {
        // if the tile is not empty check if position of empty tile is surrounding the selected tile
        // if that is true, it is a valid move
        let possibleMoves = legalMoves[currentPosition];
        emptyTile = getEmptyTilePosition();

        if(possibleMoves.indexOf(emptyTile) != -1) {
            return true;
        }
    }
    return false;
}

function checkifPuzzleIsSolved() {
    /* to check if puzzle is solved, we need to look into solution array
    and the game array, if all elements ids match the position from the 
    solution array then the puzzle has been solved.    
    */
    let isSolved = true;
    // first iterate through solution array, and look up for the corresponding element from game array
    tilesArraySolution.forEach(function(solutionElement) {
        const result = tilesArray.find(({id}) => id === solutionElement.id);
        if(result.position != solutionElement.position) {
            isSolved = false;
        }
    });
    return isSolved;
}