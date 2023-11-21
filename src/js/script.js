//#region Event listeners

// New game button
let newGameBtn = document.querySelector('#new-game');
newGameBtn.addEventListener('click', newGame);

// Tiles click listner
let selectedTile = document.querySelectorAll('.pzTile').forEach(function(tile) {
    tile.addEventListener('click', function(){
        moveTile(tile);
    });
});

//#endregion

tilesArraySolution = [
    {'id': 0, 'position': 0},
    {'id': 1, 'position': 1},
    {'id': 2, 'position': 2},
    {'id': 3, 'position': 3},
    {'id': 4, 'position': 4},
    {'id': 5, 'position': 5},
    {'id': 6, 'position': 6},
    {'id': 7, 'position': 7},
    {'id': 'empty', 'position': 8}
];

// Copy tilesArraySolution to keep track of positions
let tilesArray = JSON.parse(JSON.stringify(tilesArraySolution));

function resetGameArray() {
    tilesArray = JSON.parse(JSON.stringify(tilesArraySolution));
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

// Position of the empty tile
let emptyTile = getEmptyTilePosition();

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

function newGame(e) {
    e.preventDefault();
    // Get all the user settings
    let nTiles = document.querySelector('#tiles-number').value;

    // Create new canvas based on the settings
    
    // reset all variables to default values
    emptyTile = getEmptyTilePosition();
    resetGameArray();
    // draw the board and link each tile to array data
    drawBoard();

    // Start the game
}

// A function to draw the board UI
function drawBoard() {
    // shuffle the solution array
    shuffleEasy(1);
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

function shuffleEasy(difficulty) {
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
    }
    else {
        console.log("invalid move");
    }
    // Check if the puzzle has been solved
    let isSolved = checkifPuzzleIsSolved();
    if(isSolved == true) {
        alert('We have a winner !');
    }
    else {
        console.log("Not solved yet");
    }
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
        // console.log(`
        // result.position = ${result.position} solutionElement.position = ${solutionElement.position}
        // `);
        if(result.position != solutionElement.position) {
            isSolved = false;
        }
    });
    return isSolved;
}