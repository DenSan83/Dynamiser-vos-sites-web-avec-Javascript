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