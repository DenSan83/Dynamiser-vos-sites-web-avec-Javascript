const dom = {
    newGame: document.querySelector('.new-game'),
    diceImage: document.getElementById('dice-image'),
    rollBtn: document.getElementById('roll'),
    holdBtn: document.getElementById('hold'),
    rollAudio: document.querySelector('audio'),
    limitPoints: 100,
    fireworks: document.querySelector('.pyro'),
    bgPage: document.querySelector('.container .background-pages div:first-child')
}

const p1 = {
    name: document.querySelector('.p1 .player'),
    redDot: document.querySelector('.p1 .red-dot'),
    add: document.querySelector('.p1 .add'),
    current: document.querySelector('.p1 .current .points'),
    global: document.querySelector('.p1 .global')
}

const p2 = {
    name: document.querySelector('.p2 .player'),
    redDot: document.querySelector('.p2 .red-dot'),
    add: document.querySelector('.p2 .add'),
    current: document.querySelector('.p2 .current .points'),
    global: document.querySelector('.p2 .global')
}