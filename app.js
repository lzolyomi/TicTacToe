
// Retrieving elements
let startButton = document.getElementById('start-button');
let gameControls = document.getElementById("game-controls");
let gameBoard = document.getElementById("board");
let gameInfo = document.getElementById("game-info");
let playerSpan = document.getElementById('player');

//declaring variables for later
let restartButton;
let currentPlayer = "O"; // Currently O begins, need to fix it
let boardArray = []; // store the state of the board after each step
let currentMove; // index of the last clicked tile

// Event listeners
startButton.addEventListener('click', function(){
    gameControls.removeChild(startButton);
    restartButton = createButton("RESTART");
    gameControls.appendChild(restartButton);
    bulidGameBoard(gameBoard);
    restartButton.addEventListener('click', function(){
        boardArray = [];
        clearDiv(gameBoard);
        bulidGameBoard(gameBoard);
        gameInfo.innerHTML = "Player <span id='player'> O</span>'s turn";
        playerSpan = document.getElementById('player');
    });
});

gameBoard.addEventListener('click', function(event){
    // logs moves
    if(event.target.nodeName == 'BUTTON'){
        let press = event.target;
        if (press.value == ""){
            currentMove = event.target.id.split("-")[1]
            boardArray[currentMove].makeMove(currentPlayer);
            changePlayer(currentPlayer);
            if (assessMove(boardArray, currentMove) == true){
                changePlayer(currentPlayer); // to switch to winning player
                gameInfo.innerHTML = "Congratulations, " + currentPlayer + " won!";
            } else if(isFull(boardArray)){
                gameInfo.innerHTML = "Oops, the board is filled, restart the game"
            }
            
        };
    };
});

// Functions

function createButton(text){
    let newButton = document.createElement('button');
    newButton.className = 'button';
    newButton.id = text + '-button';
    newButton.innerHTML = text;
    return(newButton);
};


// Functions for the game itself
function bulidGameBoard(parentDiv){
    for(i=0; i < 9; i++){
        let square = buildTile(i);
        parentDiv.appendChild(square.div);
        boardArray.push(square);
    };
};

function buildTile(index){
    let tile = {
        value : index,
        div : document.createElement('button'),
        makeMove : function(player) {
            this.value = player;
            this.div.innerHTML = player;
        }
    };
    tile.div.className = 'square';
    tile.div.id = 'tile-' + index;
    return(tile);
};

function clearDiv(div){
    while(div.firstChild){
        div.removeChild(div.firstChild);
    };
};

function changePlayer(current){
    if (current == "O"){
        currentPlayer = "X";
        playerSpan.innerHTML = " X";
    } else if(current == "X"){
        currentPlayer = "O";
        playerSpan.innerHTML = " O"
    } else{console.log("Oops there is an error, current player: " + currentPlayer)};
};

function assessMove(board, currentIndex){
    let verPos = Math.floor(currentIndex/3)*3; //stores which row we are in
    let horPos = currentIndex%3; // stores which column we are in 
    // check the row
    if (board[verPos].value == board[verPos + 1].value && board[verPos].value == board[verPos + 2].value){
        return(true);
    } else if(board[horPos].value == board[horPos+3].value && board[horPos].value == board[horPos+6].value){
        return(true);
    } else if (checkDiagonal(board, currentIndex)){
        return(true);
    } else{return(false);};
};

function checkDiagonal(board, index){
    let pos = index%4;
    if(pos==0){
        if(board[pos].value == board[pos+4].value && board[pos].value == board[pos+8].value){
            return(true);
        } else{return(false);};
    } else if (pos==2){
        if(board[pos].value == board[pos+4].value && board[pos].value == board[pos + 2].value){
            return(true);
        } else{return(false);};
    } else{return(false);};
};

function isFull(board){
    let full = true;
    for(i = 0; i < board.length; i++){
        if (typeof board[i].value == 'number'){
            full = false;
        };
    };
    return(full);
};