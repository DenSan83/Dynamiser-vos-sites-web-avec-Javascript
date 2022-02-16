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

class Game {
    start() {
        this.globalP1 = 0;
        this.globalP2 = 0;
        this.round = 0;
        this.turn = 1;

        // Visuals
        p1.redDot.style.opacity = '1';
        p2.redDot.style.opacity = '0';
        p1.name.style.fontWeight = '300';
        p2.name.style.fontWeight = '100';
        p1.current.innerText = p1.global.innerText = '0';
        p2.current.innerText = p2.global.innerText = '0';
        dom.rollBtn.classList.remove('disabled');
        dom.holdBtn.classList.add('disabled');
        dom.fireworks.classList.add('d-none');
        dom.bgPage.style.backgroundColor = '#f7f7f7';
        let winnerElement = document.querySelector('.winner');
        if (winnerElement) {
            winnerElement.remove()
        }
    }

    playTurn() {
        // Allow Hold button
        dom.holdBtn.classList.remove('disabled');

        // Roll dice
        let dice = new Dice();
        dice.roll()
            .then(result => {

                let player = (this.turn === 1) ? p1 : p2;
                if (result !== 1) {
                    // Result is not one: add points to current
                    this.round += result;
                    this.playSound('win');
                    player.current.innerText = this.round;

                    // Add points animation
                    player.add.innerText = `+${result}`;
                    player.add.classList.add('active');
                    setTimeout(() => {
                        player.add.classList.remove('active');
                    }, 1000)

                } else {
                    // Result is one: lose points and end turn
                    // this.round = 0;
                    this.playSound('lose');
                    dom.holdBtn.classList.add('disabled');

                    setTimeout(() => {
                        player.current.innerText = '0';
                        this.endTurn();
                    }, 1000)
                }
            })
            .finally(() => {
                // Allow Roll button
                dom.rollBtn.classList.remove('disabled');
            })
    }

    endTurn() {
        this.round = 0;
        p1.current.innerText = '0';
        p2.current.innerText = '0';
        if (this.turn === 1) {
            p1.redDot.style.opacity = '0';
            p2.redDot.style.opacity = '1';
            p1.name.style.fontWeight = '100';
            p2.name.style.fontWeight = '300';
            this.turn = 2;
        } else {
            p1.redDot.style.opacity = '1';
            p2.redDot.style.opacity = '0';
            p1.name.style.fontWeight = '300';
            p2.name.style.fontWeight = '100';
            this.turn = 1;
        }
    }

    saveToGlobal() {
        let affectedGlobal = (this.turn === 1) ? p1.global : p2.global;
        if (this.turn === 1) {
            this.globalP1 += this.round;
            affectedGlobal.innerText = this.globalP1;
        } else {
            this.globalP2 += this.round;
            affectedGlobal.innerText = this.globalP2;
        }

        if (this.globalP1 >= dom.limitPoints || this.globalP2 >= dom.limitPoints) {
            this.declareWinner();
        } else {
            dom.holdBtn.classList.add('disabled');
            this.endTurn();
        }
    }

    declareWinner() {
        dom.rollBtn.classList.add('disabled');
        dom.holdBtn.classList.add('disabled');
        dom.fireworks.classList.remove('d-none');
        dom.bgPage.style.backgroundColor = 'transparent';

        let div = document.createElement('div');
        div.classList.add('winner');
        div.innerText = 'Winner!';
        if (this.turn === 1) {
            p1.name.prepend(div);
        } else {
            p2.name.prepend(div);
        }
    }

    playSound(sound) {
        if (sound !== 'win' && sound !== 'lose') {
            return;
        }
        let soundFile = document.createElement('audio');
        soundFile.preload = 'auto';
        let src = document.createElement('source');
        src.src = `assets/sound-fx/${sound}-SFX.mp3`;
        soundFile.appendChild(src);
        soundFile.load();
        soundFile.play();
    }
    // end Game
}



class Dice {
    ms = 120;
    spriteHeight = 97;
    diceAnimation = { // The sequence every dice runs before displaying the real result
        1: [4,2,6,5,3,1],
        2: [4,6,3,5,1,2],
        3: [5,1,2,4,6,3],
        4: [5,3,6,2,1,4],
        5: [1,4,6,2,3,5],
        6: [2,3,1,4,5,6]
    };

    roll() {
        // Make dice bounce (part 1)
        dom.rollAudio.play();
        dom.diceImage.style.transform = 'translate(0,-20px)';

        // Disable roll button
        dom.rollBtn.classList.add('disabled');

        // Pick random number and pass it to dice animation
        let randomDice = Math.floor(Math.random() * 6) + 1;
        return this.animateDice(randomDice);
    }

    animateDice = async(diceValue) => {
        // If array has 6 numbers, we will display 6 faces
        let animationsLength = Object.keys(this.diceAnimation).length;
        for (let i = 0; i < animationsLength; i++) {
            await this.slowDown(this.ms * i);

            // Pick number on background image
            let position = this.spriteHeight * this.diceAnimation[diceValue][i] - this.spriteHeight;
            dom.diceImage.style.backgroundPosition = `0px -${position}px`;
            if (i === 1) {
                // Make dice bounce (part 2)
                dom.diceImage.style.transform = 'translate(0,0)';
            } else if (animationsLength - 1 === i) {
                return diceValue;
            }
        }
    }

    slowDown(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }
    // end Dice
}


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
