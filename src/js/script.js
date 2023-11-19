// Create a new game
let newGameBtn = document.querySelector('#new-game');
newGameBtn.addEventListener('click', newGame);

// solution array = [id, correct position]
// I might switch this to JSON file
const solutionArray = [
    [0, 0], [1, 1], [2, 2], 
    [3, 3], [4, 4], [5, 5], 
    [6, 6], [7, 7]
];

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
    emptyTile = 0;

    // Start the game
}

function drawBoard() {
    // shuffle the solution array
    shuffleArray();
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
function shuffleArray() {
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
    console.log(tile.dataset);
    const tileId = tile.dataset.tileid;
    console.log(`Moving ${tileId} from ${currentPosition}`);
    // check if the selected tile is a valid tile by matching the tile id and position with the solution array
        // if true, move current tile to an empty position

}

function isTileValid(position) {
    // check if adjacent positions are empty

        // if true, return true
}