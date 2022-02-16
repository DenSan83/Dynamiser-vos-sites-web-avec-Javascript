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
        document.getElementsByTagName('audio')[0].play();
        document.getElementById('dice-image').style.transform = 'translate(0,-20px)';

        // Disable roll button
        document.getElementById('roll').classList.add('disabled')

        // Pick random number and pass it to dice animation
        let randomDice = Math.floor(Math.random() * 6) + 1;
        return this.animateDice(randomDice);
    }

    animateDice = async(diceValue) => {
        // If array is 6 numbers long, we will display 6 faces
        let animationsLength = Object.keys(this.diceAnimation).length;
        for (let i = 0; i < animationsLength; i++) {
            await this.slowDown(this.ms * i)

            // Pick number on background image
            let position = this.spriteHeight * this.diceAnimation[diceValue][i] - this.spriteHeight;
            document.getElementById('dice-image').style.backgroundPosition = `0px -${position}px`;
            if (i === 1) {
                // Make dice bounce (part 2)
                document.getElementById('dice-image').style.transform = 'translate(0,0)';
            } else if (animationsLength - 1 === i) {
                return diceValue;
            }
        }
    }

    slowDown(time) {
        return new Promise(resolve => setTimeout(resolve, time))
    }
    // end Dice
}


let round = 0;
let turn = 1;
document.querySelector('.p1 .red-dot').style.opacity = 1;
document.getElementById('roll').addEventListener('click', () => {
    let dice = new Dice();
    dice.roll()
        .then(result => {
            // wait until end of animation to display result
            round = (result === 1) ? 0 : round + result;
            if (result === 1) {
                round = 0;
                turn = (turn === 1) ? 2 : 1;

                // losing points sound
                let soundFile = document.createElement('audio');
                soundFile.preload = 'auto';
                let src = document.createElement('source');
                src.src = 'assets/sound-fx/lose-SFX.mp3';
                soundFile.appendChild(src);
                soundFile.load();
                soundFile.play();

                setTimeout(() => {
                    if (turn === 1) {
                        document.querySelector('.p1 .red-dot').style.opacity = 1;
                        document.querySelector('.p2 .red-dot').style.opacity = 0;
                    } else {
                        document.querySelector('.p1 .red-dot').style.opacity = 0;
                        document.querySelector('.p2 .red-dot').style.opacity = 1;
                    }
                }, 1000)
            } else {
                // Add points animation
                if (turn === 1) {
                    document.querySelector('.p1 .add').innerText = `+${result}`;
                    document.querySelector('.p1 .add').classList.add('active');
                } else {
                    document.querySelector('.p2 .add').innerText = `+${result}`;
                    document.querySelector('.p2 .add').classList.add('active');
                }
                setTimeout(() => {
                    document.querySelector('.p1 .add').classList.remove('active');
                    document.querySelector('.p2 .add').classList.remove('active');
                }, 1000)

                // winning points sound
                let soundFile = document.createElement('audio');
                soundFile.preload = 'auto';
                let src = document.createElement('source');
                src.src = 'assets/sound-fx/win-SFX.mp3';
                soundFile.appendChild(src);
                soundFile.load();
                soundFile.play();

            }

            // Add points to Current
            if (turn === 1) {
                setTimeout(() => {
                    document.querySelector('.p1 .current .points').innerText = round;
                }, 500)
            } else {
                setTimeout(() => {
                    document.querySelector('.p2 .current .points').innerText = round;
                }, 500)
            }
        })
        .finally(() => {
            // Allow roll button
            document.getElementById('roll').classList.remove('disabled')
        })
})