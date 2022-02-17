class Game {
    start() {
        this.globalP1 = 0;
        this.globalP2 = 0;

        // Visuals
        p1.global.innerText = '0';
        p2.global.innerText = '0';
        this.endTurn();
        dom.rollBtn.classList.remove('disabled');
        dom.holdBtn.classList.add('disabled');
        let winnerElement = document.querySelector('.winner');
        if (winnerElement) {
            winnerElement.remove()
            dom.bgPage.style.backgroundColor = '#f7f7f7';
            dom.fireworks.classList.add('d-none');
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

                    // Add points animation
                    player.add.innerText = `+${result}`;
                    player.add.classList.add('active');
                    setTimeout(() => {
                        player.current.innerText = this.round;
                        player.add.classList.remove('active');
                    }, 1000)

                } else {
                    // Result is one: lose points and end turn
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
        // Purely visual indications
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
        // Add to player Global points
        if (this.turn === 1) {
            this.globalP1 += this.round;
            p1.global.innerText = this.globalP1;
        } else {
            this.globalP2 += this.round;
            p2.global.innerText = this.globalP2;
        }

        // If a player has dom.limitPoints or more, declare winner. Else, end turn
        if (this.globalP1 >= dom.limitPoints || this.globalP2 >= dom.limitPoints) {
            this.declareWinner();
        } else {
            dom.holdBtn.classList.add('disabled');
            this.endTurn();
        }
    }

    declareWinner() {
        // Visuals
        dom.rollBtn.classList.add('disabled');
        dom.holdBtn.classList.add('disabled');
        dom.fireworks.classList.remove('d-none');
        dom.bgPage.style.backgroundColor = 'transparent';

        // Add text "winner"
        let winnerElement = document.createElement('div');
        winnerElement.classList.add('winner');
        winnerElement.innerText = 'Winner!';
        if (this.turn === 1) {
            p1.name.prepend(winnerElement);
        } else {
            p2.name.prepend(winnerElement);
        }
    }

    playSound(sound) {
        // Verify sound exists
        if (sound !== 'win' && sound !== 'lose') {
            return;
        }
        // Create, append, load and play sound
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