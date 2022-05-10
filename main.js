

var app = new Vue({
    el: "#app",

    data: {
        show: false,

        flipcount: 0,

        // Timer data
        count: 0,

        format: "---:---",

        ticker: undefined,

        timerState: 'stopped',

        cards: [
            { id: 1, src: "images/Bee_Happy_Emote.png" },
            { id: 1, src: "images/Bee_Happy_Emote.png" },
            { id: 2, src: "images/Bee_Mad_Emote.png" },
            { id: 2, src: "images/Bee_Mad_Emote.png" },
            { id: 3, src: "images/Bee_Sad_Emote.png" },
            { id: 3, src: "images/Bee_Sad_Emote.png" },
            { id: 4, src: "images/D'Pengu_Emote.png" },
            { id: 4, src: "images/D'Pengu_Emote.png" },
            { id: 5, src: "images/M'Pengu_Emote.png" },
            { id: 5, src: "images/M'Pengu_Emote.png" },
            { id: 6, src: "images/Shell_Shocked_Emoted.png" },
            { id: 6, src: "images/Shell_Shocked_Emoted.png" },
            { id: 7, src: "images/Minionstein_Emote.png" },
            { id: 7, src: "images/Minionstein_Emote.png" },
            { id: 8, src: "images/Game_Over_Emote.png" },
            { id: 8, src: "images/Game_Over_Emote.png" }
        ],

        selection1: null,

        selection2: null,

        correctCards: [],

        p1Score: 0,

        p2Score: 0
    },

    methods: {
        shuffle: function () {

            let array = this.cards.length, temp, random, i;

            //Fisher Yate's shuffle algorithm

            for (i = 0; i < array; i++) {

                // Pick a remaining element

                random = Math.round(Math.random() * i);

                // Swap it with the current element

                temp = this.cards[i];

                Vue.set(this.cards, i, this.cards[random])
                Vue.set(this.cards, random, temp);

            }

        },


        // Timer methods

        startTimer: function () {
            if (this.timerState !== 'running') {
                this.tick();
                this.timerState = 'running';
            }
        },

        tick: function () {
            this.ticker = setInterval(() => {
                this.count++;
                this.format = this.formatTime(this.count);
            }, 1000)
        },

        formatTime(seconds) {
            let currentTime = new Date(null);
            currentTime.setSeconds(seconds);
            let time = currentTime.toISOString().substr(14, 5);
            return time;
        },

        stopTimer: function () {
            window.clearInterval(this.ticker);
            this.count = 0;
            this.format = "---:---";
            this.timerState = "stopped";
        },


        // Flipcount methods

        incrementflip: function (value) {
            this.flipcount += value;
        },


        // Card Handler

        cardHandler: function (card) {

            if (!this.selection1) {
                this.selection1 = card;
                console.log("First card selected: ", card.id)
            }
            else {
                this.selection2 = card;
                console.log("Second card selected: ", card.id);
                if (this.selection1.id === this.selection2.id) {
                    this.correctCards.push(this.selection1);
                    this.correctCards.push(this.selection2);
                    this.p1Score++;
                    this.selection1.isPair = true;
                    this.selection2.isPair = true;
                    this.selection1 = null;
                    this.selection2 = null;
                    console.log('ITS A PAIR!');
                    console.log('Total score' + this.p1Score)

                    if (this.correctCards.length === this.cards.length) {
                        this.stopTimer();
                        setTimeout(() => {
                            alert("Player 1 wins!")
                        }, 200);
                    }

                }
                else {
                    let card_1 = this.selection1, card_2 = this.selection2;
                    setTimeout(() => {
                        card_1.isFlipped = false;
                        card_2.isFlipped = false;
                    }, 1000);

                    this.selection1 = null;
                    this.selection2 = null;
                    console.log("ITS NOT A PAIR!")

                }
            }
        },

        reset: function () {
            this.flipcount = 0;
            this.p1Score = 0;
            this.correctCards = [];
            this.stopTimer();
        }
    }
});