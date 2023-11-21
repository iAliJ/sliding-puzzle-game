// Create a new game
let newGameBtn = document.querySelector('#new-game');
newGameBtn.addEventListener('click', newGame);

// solution array = [id, correct position]
// I might switch this to JSON file
const solutionArray = [
    ['0', 0], ['1', 1], ['2', 2], 
    ['3', 3], ['4', 4], ['5', 5], 
    ['6', 6], ['7', 7]
];

const tilesArray = [
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

// Index of an empty tile
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

// Tiles event listner
let selectedTile = document.querySelectorAll('.pzTile').forEach(function(tile) {
    tile.addEventListener('click', function(){
        moveTile(tile);
    });
});

function newGame(e) {
    e.preventDefault();
    // Get all the user settings
    let nTiles = document.querySelector('#tiles-number').value;

    // Create new canvas based on the settings
    
    // reset all variables to default values
    emptyTile = getEmptyTilePosition();

    // draw the board and link each tile to array data
    drawBoard();

    // Start the game
}

// A function to draw the board UI
function drawBoard() {
    // shuffle the solution array
    shuffle();
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
}

function moveTile(tile) {
    // get the current tile position and id
    const currentPosition = tile.dataset.currentPosition;
    const tileId = tile.dataset.tileid;
    // check if the selected tile is a valid tile by matching the tile id and position with the solution array
    let isMoveValid = ValidateMove(tileId, currentPosition);
        // if true, move current tile to an empty position by swapping them
    if(isMoveValid) {
        console.log("Valid move");
        swapTile(tile, tileId, currentPosition);
    }
    else {
        console.log("Cannot move an empty tile");
    }
}

function swapTile(tile, tileId, tilePosition) {
    // swap the position of empty tile and selected tile by using temp variable
    let temp = emptyTile;
    emptyTile = tilePosition;
    tilePosition = temp;
    // update the solutionarray and index of empty tile
    updateTilePosition(tileId, tilePosition);
    // update the HTML
}

function updateTilePosition(id, position) {
    // get the sub array
    // look for the id in the shuffled array
    solutionArray[id][1] = position;
}

function ValidateMove(tileId, currentPosition) {
    // if selected tile has empty tile id return false
    if(tileId === 'empty') {
        return false;
    }
    else {
        // check if position of empty tile is surrounding the selected tile
        let possibleMoves = legalMoves[currentPosition];
        console.log((emptyTile));
        if(possibleMoves.indexOf(emptyTile) != -1) {
            return true;
        }
    }
}