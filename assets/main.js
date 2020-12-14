class Card {
    constructor(figure) {
        this.figure = figure;
        this.image = null;
    }

}


class Game {
    constructor() {
        this.deck = this.generateDeck();
        this.playerCards = this.cardsDraw();
        this.compCards = this.cardsDraw();
        this.button = document.getElementById('start');
        console.log(this.playerCards);
        console.log(this.compCards);
    }

    initGame() {
        this.button.addEventListener('click', this.startGame.bind(this));
    }

    startGame() {
        this.singleDraw();
    }

    singleDraw() {

        if (this.playerCards.length == 0) {
            div_result.innerHTML = 'Comp Wins Game'
        }
        else if (this.compCards.length == 0) {
            div_result.innerHTML = 'You Win Game'
        }

        const player_cards_img = document.querySelector('#player_cards');
        const comp_cards_img = document.querySelector('#comp_cards');

        const player_card = this.playerCards[0];
        this.playerCards.shift();

        const comp_card = this.compCards[0];
        this.compCards.shift();

        player_cards_img.src = player_card.image;
        comp_cards_img.src = comp_card.image;

        const div_result = document.querySelector('#display_result')
        if (player_card.figure == comp_card.figure) {
            new Audio('assets/sounds/war.wav').play();
            div_result.innerHTML = 'wojna'
        }

        else if (player_card.figure > comp_card.figure) {
            this.playerCards.push(player_card);
            this.playerCards.push(comp_card);
            new Audio('assets/sounds/win.mp3').play();
            div_result.innerHTML = 'You Win'
        }
        else {
            this.compCards.push(player_card);
            this.compCards.push(comp_card);
            new Audio('assets/sounds/loose.wav').play();
            div_result.innerHTML = 'Comp Wins'
        }

    }

    generateDeck() {
        const figures = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
        const colors = ['diamonds', 'hearts', 'spades', 'clubs'];
        const imageFigures = ['two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'jack', 'queen', 'king', 'ace'];
        const cards = [];

        for (let i = 0; i < figures.length; i++) {
            for (let j = 0; j < colors.length; j++) {
                const card = new Card(figures[i]);
                card.image = `assets/images/${imageFigures[i]}_${colors[j]}.png`;
                cards.push(card);
            }
        }

        cards.sort(function (a, b) {
            return Math.random() - 0.5;
        })

        return cards;
    }

    cardsDraw() {

        const cards = [];
        for (let i = 0; i < 26; i++) {
            cards.push(this.deck[0]);
            this.deck.splice(0, 1);

        }
        return cards;
    }


}


const game = new Game();
game.initGame();
