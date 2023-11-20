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

const solutionObj = [
    {'0': 0},
    {'1': 1},
    {'2': 2},
    {'3': 3},
    {'4': 4},
    {'5': 5},
    {'6': 6},
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
let emptyTile = 8;

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

    // draw the board and link each tile to array data
    drawBoard();

    // reset all variables to default values
    emptyTile = 8;

    // Start the game
}

function drawBoard() {
    // shuffle the solution array
    shuffle();
    // Initialize the tiles
    initiateTiles();
    // assign the array elements to each tile
    solutionArray.forEach(function(element, tileIndex){
        let currentTile = document.querySelector(`.pzTile[data-currentPosition="${tileIndex}"]`);
        currentTile.innerText = element[0];
        currentTile.dataset.currentPosition = tileIndex;
        currentTile.dataset.tileid = element[0];
    });
}

function initiateTiles() {
    document.querySelectorAll('.pzTile').forEach(function(tile, i){
        tile.dataset.currentposition = i;        
    });
}

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle() {
    for (let i = solutionArray.length - 1; i > 0; i--) {
        // Get a randm index, then swap current position with a random elment
        var j = Math.floor(Math.random() * (i + 1));
        var temp = solutionArray[i];
        solutionArray[i] = solutionArray[j];
        solutionArray[j] = temp;
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
    console.log(
        `id: ${tileId}\n
        new position: ${tilePosition}`
    );
    // update the solutionarray and index of empty tile
    updateTilePosition(tileId, tilePosition);
    // update the HTML
}

function updateTilePosition(id, position) {
    // get the sub array
    // look for the id in the shuffled array
    solutionArray[id][1] = position;
    console.log(solutionArray[id][1]);
    console.log(solutionArray);
}

function ValidateMove(tileId, currentPosition) {
    // if selected tile has empty tile id return false
    if(tileId == '8') {
        return false;
    }
    else {
        // check if position of empty tile is surrounding the selected tile
        let possibleMoves = legalMoves[currentPosition];
        if(possibleMoves.indexOf(emptyTile) != -1) {
            return true;
        }
    }
}