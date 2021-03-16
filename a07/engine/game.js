/*
Add your code for Game here
 */
export default class Game {
    constructor(size) {
        this.size = size;
        this.losingArray = [];
        this.shiftingArray = [];
        this.fullSize = this.size * this.size;
        this.winningArray = [];
        this.gameState = {
            board: new Array(this.size * this.size).fill(0), //fills array w zeroes
            score: 0,
            won: false,
            over: false,
        }
        this.pieces = new Array(this.size);
        for (let i = 0; i < this.size; i++) {
            this.pieces[i] = new Array(this.size).fill(new piece(0));
        }
        this.highest = 0 //sets highest
        this.win = 2048 // sets win value to 2048
        this.randomvalue()
        this.randomvalue()
    }
    // function creates a random board piece
    randomvalue() {
        let nonZero = true;
        for (let i = 0; i < this.fullSize; i++) {
            if (this.gameState.board[i] == 0) {
                nonZero = false;
                break;
            }
        }
        if (nonZero == false) {
            let randomValue = Math.floor(Math.random() * 100);
            var pos = 0;
            var newSquareVal = 0;
            var boardSize = this.size * this.size
            if (randomValue >= 90) {
                newSquareVal = 4;
            } else {
                newSquareVal = 2;
            }
            while (true) {
                pos = Math.floor(Math.random() * (boardSize + 1));
                if (this.gameState.board[pos] == 0) {
                    break;
                }
            }
            this.gameState.board[pos] = newSquareVal;
            this.pieces[Math.floor(pos / this.size)][pos % this.size] = new piece(newSquareVal)
        }
    }
    loadGame(gameState) {
        this.gameState = gameState;
    }
    setupNewGame() {
        this.gameState.won = false;
        this.gameState.score = 0;
        this.gameState.board = new Array(this.size * this.size).fill(0);
        this.gameState.over = false;
        for (let i = 0; i < this.size; i++) {
            this.pieces[i] = new Array(this.size).fill(new piece(0));
        }
        this.randomvalue()
        this.randomvalue()

    }
    move(direction) {
        let duplicate = true;
        let copyOfArray = [...this.gameState.board];

        if (direction == "up") {
            let x = 0;
            let temp = 0;
            let col = 0;
            let row = 0;
            for (let i = 0; i < this.size; i++) {
                col = i;
                for (let j = 0; j < this.fullSize; j += this.size) {
                    row = j;
                    x = row + col;
                    temp = x;
                    if (this.gameState.board[x] == 0) {
                        while (temp < this.fullSize) {
                            if (this.gameState.board[temp] !== 0) {
                                this.gameState.board[x] = this.gameState.board[temp];
                                this.gameState.board[temp] = 0;
                                break;
                            }
                            temp += this.size;
                        }
                    }

                }
            }
            x = 0;
            for (let b = 0; b < this.size; b++) {
                for (let a = 0; a < this.fullSize; a++) {

                    if (this.gameState.board[x] == this.gameState.board[x + this.size] && this.gameState.board[x] !== 0 && x + this.size < this.fullSize) {
                        this.gameState.board[x] += this.gameState.board[x + this.size];
                        this.gameState.score += this.gameState.board[x];
                        this.gameState.board[x + this.size] = 0;
                    }
                    x++;
                }
            }
            for (let i = 0; i < this.size; i++) {
                col = i;
                for (let j = 0; j < this.fullSize; j += this.size) {
                    row = j;
                    x = row + col;
                    temp = x;
                    if (this.gameState.board[x] == 0) {
                        while (temp < this.fullSize) {
                            if (this.gameState.board[temp] !== 0) {
                                this.gameState.board[x] = this.gameState.board[temp];
                                this.gameState.board[temp] = 0;
                                break;
                            }
                            temp += this.size;
                        }
                    }
                }
            }
            for (let g = 0; g < this.fullSize; g++) {
                if (copyOfArray[g] != this.gameState.board[g]) {
                    duplicate = false;
                    break;
                }
            }
            if (duplicate == false) {
                this.randomvalue();
            }
        }
        if (direction == "down") {
            let x = 0;
            let temp = 0;
            x = this.fullSize - 1
            for (let i = 0; i < this.size; i++) {  //i = col
                for (let j = this.fullSize; j > 0; j -= this.size) { //j =row
                    temp = x;
                    if (this.gameState.board[x] == 0) { 
                        while (temp >= 0) {
                            if (this.gameState.board[temp] !== 0) {
                                this.gameState.board[x] = this.gameState.board[temp];
                                this.gameState.board[temp] = 0;
                                break;
                            }
                            temp -= this.size;
                        }

                    }
                    x--
                }
            }
            x = this.fullSize;
            for (let b = 0; b < this.size; b++) {
                for (let a = this.fullSize; a > 0; a--) {
                    if (this.gameState.board[x] == this.gameState.board[x - this.size] && this.gameState.board[x] !== 0 && x - this.size >= 0) {
                        this.gameState.board[x] += this.gameState.board[x - this.size];
                        this.gameState.score += this.gameState.board[x];
                        this.gameState.board[x - this.size] = 0;
                    }
                    x--
                }
            }
            x = this.fullSize - 1
            for (let i = 0; i < this.size; i++) {
                for (let j = this.fullSize; j > 0; j -= this.size) {
                    temp = x;
                    if (this.gameState.board[x] == 0) {
                        while (temp >= 0) {
                            if (this.gameState.board[temp] !== 0) {
                                this.gameState.board[x] = this.gameState.board[temp];
                                this.gameState.board[temp] = 0;
                                break;
                            }
                            temp -= this.size;
                        }
                    }
                    x--;
                }
            }
            for (let g = 0; g < this.fullSize; g++) {
                if (copyOfArray[g] != this.gameState.board[g]) {
                    duplicate = false;
                    break;
                }
            }
            if (duplicate == false) {
                this.randomvalue();
            }
        }
        if (direction == "right") {
            let col = 0;
            let row = 0;
            let x = 0;
            let temp = 0;
            for (let j = 0; j < this.fullSize; j += this.size) {
                row = j;
                for (let i = this.size - 1; i >= 0; i--) {
                    col = i;
                    x = row + col;
                    temp = x;
                    if (this.gameState.board[x] == 0) {
                        while (temp >= row) {
                            if (this.gameState.board[temp] !== 0) {
                                this.gameState.board[x] = this.gameState.board[temp];
                                this.gameState.board[temp] = 0;
                                break;
                            }
                            temp--;
                        }
                    }

                }
            }

            x = (this.fullSize - 1)
            temp = this.fullSize - this.size
            for (let a = 0; a < this.fullSize; a += this.size) {
                for (let b = this.size; b > 0; b--) {
                    if (this.gameState.board[x] == this.gameState.board[x - 1] && this.gameState.board[x] !== 0 && x - 1 >= temp) {
                        this.gameState.board[x] += this.gameState.board[x - 1];
                        this.gameState.score += this.gameState.board[x];
                        this.gameState.board[x - 1] = 0;
                    }
                    x--;
                }
                temp -= this.size;
            }


            for (let j = 0; j < this.fullSize; j += this.size) {
                row = j;
                for (let i = this.size - 1; i >= 0; i--) {
                    col = i;
                    x = row + col;
                    temp = x;

                    if (this.gameState.board[x] == 0) {
                        while (temp >= row) {
                            if (this.gameState.board[temp] !== 0) {
                                this.gameState.board[x] = this.gameState.board[temp];
                                this.gameState.board[temp] = 0;
                                break;
                            }
                            temp--;
                        }
                    }

                }
            }
            for (let g = 0; g < this.fullSize; g++) {
                if (copyOfArray[g] != this.gameState.board[g]) {
                    duplicate = false;
                    break;
                }
            }
            if (duplicate == false) {
                this.randomvalue();
            }
        }


        if (direction == "left") {
            let col = 0;
            let row = 0;
            let x = 0;
            let temp = 0;
            for (let j = 0; j < this.fullSize; j += this.size) {
                row = j;
                for (let i = 0; i < this.size; i++) {
                    col = i;
                    x = row + col;
                    temp = x;
                    if (this.gameState.board[x] == 0) {
                        while (temp <= row + this.size - 1) {
                            if (this.gameState.board[temp] !== 0) {
                                this.gameState.board[x] = this.gameState.board[temp];
                                this.gameState.board[temp] = 0;
                                break;
                            }
                            temp++;
                        }
                    }

                }
            }
            x = 0;
            temp = this.size;
            for (let a = 0; a < this.fullSize; a++) {
                for (let b = 0; b < this.size; b++) {
                    if (this.gameState.board[x] == this.gameState.board[x + 1] && this.gameState.board[x] !== 0 && x + 1 < temp && x + 1 < this.fullSize) {
                        this.gameState.board[x] += this.gameState.board[x + 1];
                        this.gameState.score += this.gameState.board[x];
                        this.gameState.board[x + 1] = 0;
                    }
                    x++
                }
                temp += this.size;
            }
            for (let j = 0; j < this.fullSize; j += this.size) {
                row = j;
                for (let i = 0; i < this.size; i++) {
                    col = i;
                    x = row + col;
                    temp = x;

                    if (this.gameState.board[x] == 0) {
                        while (temp <= row + this.size - 1) {
                            if (this.gameState.board[temp] !== 0) {
                                this.gameState.board[x] = this.gameState.board[temp];
                                this.gameState.board[temp] = 0;
                                break;
                            }
                            temp++;
                        }
                    }

                }
            }
            for (let g = 0; g < this.fullSize; g++) {
                if (copyOfArray[g] != this.gameState.board[g]) {
                    duplicate = false;
                    break;
                }
            }
            if (duplicate == false) {
                this.randomvalue();
            }
        }
        for (let h = 0; h < this.fullSize; h++) {
            if (this.gameState.board[h] == 2048) {
                this.gameState.won = true;
                this.winningArray.forEach(element => {
                    element(this.getGameState());
                });
                break;
            }
        }
        let moveOpen = false;
        let boardIsFull = true;

        for (let a = 0; a < this.fullSize; a++) {
            if (this.gameState.board[a] == 0) {
                boardIsFull = false;
                break;
            }
        }
        if (boardIsFull == true) {
            for (let q = 0; q < this.fullSize; q++) {
                if ((this.gameState.board[q] == this.gameState.board[q + 1] && (q + 1) % 4 !== 0) || (this.gameState.board[q] == this.gameState.board[q - 1] && q % 4 !== 0) || this.gameState.board[q] == this.gameState.board[q - this.size] || this.gameState.board[q] == this.gameState.board[q + this.size]) {
                    moveOpen = true;
                    break;
                }
            }
            if (moveOpen == false && boardIsFull == true) {
                this.gameState.over = true;
                this.losingArray.forEach(element => {
                    element(this.getGameState());
                });
            }
        }
        this.shiftingArray.forEach(element => {
            element(this.getGameState());
        });
    }

    onMove(callback) {
        this.shiftingArray[this.shiftingArray.length] = callback
    }
    onLose(callback) {
        this.losingArray[this.losingArray.length] = callback
    }
    getGameState() {
        return this.gameState;
    }
    onWin(callback) {
        this.winningArray[this.winningArray.length] = callback
    }

    toString() {
        let z = '';
        for (let i = 0; i < this.gameState.board.length; i++) {
            if (i % this.size === 0) {
                z += '\n'
            }
            z += this.gameState.board[i] + ' '
        }
        z += '\n' + 'Score: ' + this.gameState.score + '\n'
        z += '\n' + 'Won: ' + this.gameState.won + ', Over: ' + this.gameState.over
        return z;
    }
}
export class piece {
    constructor(value) {
        this.value = value;
        this.used = false;
    }
}