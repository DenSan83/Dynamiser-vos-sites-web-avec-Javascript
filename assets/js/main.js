let game = new Game();
dom.newGame.addEventListener('click', () => {
    game.start();
})
dom.rollBtn.addEventListener('click', () => {
    game.playTurn();
})
dom.holdBtn.addEventListener('click', () => {
    game.saveToGlobal();
})
