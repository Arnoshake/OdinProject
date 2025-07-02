
function CreateGame(){
    // Private Variables
    const GameBoard = [ ["-","-","-"], ["-","-","-"], ["-","-","-"]];
    let gameTurn = 0;
    let isGameOver = false;

    return{
        // Public Variables/Methods
        initializeBoard(){
            let boardArea = document.getElementById("game-container");
            boardArea.innerHTML = "";
            let playerOne = this.CreatePlayer("X");
            let playerTwo = this.CreatePlayer("O");

        for (let r = 0; r < 3; r++){
            let rowContainer = document.createElement("div");
            rowContainer.classList.add("row");
            for (let c = 0; c < 3; c++){
                let tile = document.createElement("button");
                tile.classList.add("tile");
                tile.dataset.row = r;
                tile.dataset.col = c;
                tile.textContent = "-";

                tile.addEventListener("click", () => {
                    // ACTUAL GAME LOGIC
                    console.log (`Tile (${r},${c}) Clicked ${gameTurn}`)
                    let playerMakingMove;
                    if (gameTurn %2 == 0) playerMakingMove = playerOne;
                    else playerMakingMove = playerTwo;
                    let winner = `Player ${playerMakingMove.playerSymbol}`;
                    this.makeMove(playerMakingMove,r,c);
                    tile.textContent = playerMakingMove.playerSymbol;
                    gameTurn+=1;
                    isGameOver = this.checkWin(GameBoard,playerMakingMove.playerSymbol);
                    // if (playerMakingMove == playerOne){;
                    //     winner = "Player 'X'"
                    //     this.makeMove(playerOne,r,c)
                    //     tile.textContent = playerOne.playerSymbol;
                    //     gameTurn +=1;
                    //     isGameOver = this.checkWin(GameBoard,playerOne.playerSymbol);
                    // }
                    // if (playerMakingMove == 2){
                    //     winner = "Player 'O'"
                    //     this.makeMove(playerTwo,r,c);
                    //     tile.textContent = playerTwo.playerSymbol;
                    //     gameTurn +=1;
                    //     isGameOver = this.checkWin(GameBoard,playerTwo.playerSymbol);
                    // } 
                    if (isGameOver){
                        alert(`${winner} has Won!`)
                        location.reload();
                    
                    }
                    else if (gameTurn == 9){
                        alert ("Tie!");
                        location.reload()
                    }

                    
                    
                }, { once: true });
                rowContainer.appendChild(tile);
            }
            boardArea.appendChild(rowContainer);
        }
        },
        CreatePlayer: function (playerSymbol){
            return{
                playerSymbol
            }
        },
        makeMove(player,row,col){
            if (GameBoard[row][col] == "-"){
                GameBoard[row][col] = player.playerSymbol;
            }
            
        },
        checkWin(board, symbol){

            for (let row = 0; row < 3; row++){
               if ( board[row][0] == symbol &&
                    board[row][1] == symbol &&
                    board[row][2] == symbol 
                  ) return true;
            }
            for (let col = 0; col < 3; col++){
               if ( board[0][col] == symbol &&
                    board[1][col] == symbol &&
                    board[2][col] == symbol 
               ) return true;
            }
            if (board[1][1] == symbol){
                if ( (board[0][0] == symbol && board[2][2] == symbol) || 
                     (board[0][2] == symbol && board[2][0] == symbol) 
                   ) return true;
            }
            else{
                return false;
            }
        },
        
    }

}


let game = CreateGame();

game.initializeBoard();





