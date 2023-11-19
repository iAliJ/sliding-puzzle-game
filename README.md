# sliding-puzzle-game
A sliding puzzle game for SEI program

## The game flow
* The game played as peer vs peer scoring system
* the player can select difficulty
* The user needs to click on image to slide it
* The user is able to rotate the image the correct orientation
* The players takes turns into playing, a total of 3 rounds and store the score
* Highest score after 3 rounds wins the match

## Difficulty
* Change the roundtimer
* Select tiles: 3X3 or 4X4

## Game controls
* When the user click on a tile it zooms in then user gets a prompt to rotate the tile

## How to store data
* Each tile position is marked from 0-8 and has a rotation of 0
* at the start of the game, each tile position and rotation is randomized (0-8) for position and (0-3) for rotation
* data will be array of objects:
    [
        {0,0},{1,0},{2,0},
        {3,0},{4,0},{5,0},
        {6,0},{7,0},{8,0}
     ]
* Save score in local storage

## Win condition for each round
* The player should place all the tiles to the correct position
* The player solve the puzzle within the time limit for bonus points.

## Scoring for each round
* If player managed to solve the puzzle they gain 100 points.
* If user solved the puzzle within the time limits they gain bonus points based on how much time is left.
* If user solves the puzzle after the time is over they dont earn the bonus points.
* If user gives up they gain 0 points from that round

## Win condition for match
* Highest points after 3 rounds