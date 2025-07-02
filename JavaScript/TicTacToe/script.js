
function CreateGame(){
    // Private Variables
    const GameBoard = [ ["-","-","-"], ["-","-","-"], ["-","-","-"]];
    return{
        // Public Variables/Methods
        makeMove(row,col){
            if (GameBoard[row][col] == "-"){
                GameBoard[row][col] = playerSymbol;
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
        }
    }
}
function CreatePlayer(playerSymbol){
    return{
        playerSymbol,
        
    }
}



