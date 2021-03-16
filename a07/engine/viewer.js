import Game from "./game.js"

export const newGame = function (game) {
    const $root = $('#root');
    let reset = `  <button type="button" class="reset">Reset</button>`
    let gamestate = ``;
    let gameBox = `<div class="gameBox">`;
    for (let i = 0; i < game.fullSize; i++) {
        gameBox += `<div class="piece">${game.gameState.board[i]}</div>`
    }
    let score = `<div class="score"><h3>Current Score: ${game.gameState.score}</h3></div>`
    if (game.gameState.won == true) {
        gamestate = `You won the game! :)`
    }
    if (game.gameState.over == true) {
        gamestate = `The game is over! You lost :(`
    }

    $root.html(game)
    $root.append(score)
    $root.append(gameBox)
    $root.append(reset)
}

$(function () {
    let game = new Game(4);
    newGame(game);
    $(document).on('keydown', function (e) {
        e.preventDefault();
        if (e.keyCode == '40') {
            game.move('down');
        }
        if (e.keyCode == '38') {
            game.move('up');
        }
        if (e.keyCode == '37') {
            game.move('left');
        }
        if (e.keyCode == '39') {
            game.move('right');
        }
        const $root = $('#root');
        let gamestate = ``;
        let reset = `  <button type="button" id="reset">Reset</button>`
        let gameBox = `<div class="gameBox">`;
        for (let i = 0; i < game.fullSize; i++) {
            gameBox += `<div class="piece">${game.gameState.board[i]}</div>`
        }
        let score = `<div class="score"><h3>Current Score: ${game.gameState.score}</h3></div>`
        if (game.gameState.won == true) {
            gamestate = `<div class="gameWon">You won the game!</div>`
        }
        if (game.gameState.over == true) {
            gamestate = `<h3 class="gameLost">The game is over, you lose!</h3>`
        }

        $(document).on('click', `#reset`, function () {
            //this was a good meme
            game.setupNewGame();

            const $root = $('#root');
            let gamestate = ``;
            let reset = `  <button type="button" id="reset">Reset</button>`
            let gameBox = `<div class="gameBox">`;
            for (let i = 0; i < game.fullSize; i++) {
                gameBox += `<div class="piece">${game.gameState.board[i]}</div>`
            }
            let score = `<div class="score">Current Score: ${game.gameState.score}</div>`
            if (game.gameState.won == true) {
                gamestate = `<div class="gameWon">You won the game!</div>`
            }
            if (game.gameState.over == true) {
                gamestate = `<h3 class="gameLost">The game is over, you lose!</h3>`
            }
            $root.html(game)
            $root.append(score)
            $root.append(gameBox)
            $root.append(reset)
            $root.append(gamestate)
        });
        $root.html(game)
        $root.append(score)
        $root.append(gameBox)
        $root.append(reset)
        $root.append(gamestate)

    });
});