// Create a new game
let newGameBtn = document.querySelector('#new-game');
newGameBtn.addEventListener('click', newGame);

// solution array = [number, correct position]
// I might switch this to JSON file
const solutionArray = [
    [1, 0], [2, 1], [3, 2], 
    [4, 3], [5, 4], [6, 5], 
    [7, 6], [8, 7]
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
    // assign the array elements to each tile
}

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffleArray() {
    for (var i = solutionArray.length - 1; i > 0; i--) {
        // Get a randm index
        var j = Math.floor(Math.random() * (i + 1));
        var temp = solutionArray[i];
        solutionArray[i] = solutionArray[j];
        solutionArray[j] = temp;
    }
    console.log(solutionArray)
}

function moveTile(tile) {
    // get the current tile position
    console.log(tile.innerText);
    // check if the selected tile is a valid tile
        // if true, move current tile to an empty position

}

function isTileValid(position) {
    // check if adjacent positions are empty
        // if true, return true
}