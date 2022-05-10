Vue.component('card', {

    props: ['card'],

    template: `
    <div class="cardboard">
        <div class="outer" @click="flip();" >
            <div class="card front" :style="{ transform: isFlipped? 'none': 'rotateY(180deg)', opacity: isPair? '0.6': 'none'}">
                <img :src="card.src">
            </div>
            <div class="card back" :style="{ transform: isFlipped? 'rotateY(180deg)': 'none'}"></div>
        </div>
    </div>
    `,

    data: function () {
        return {
            isFlipped: false,
            isPair: false,
            id: this.card.id
        };
    },
    methods: {
        flip: function () {
            if (this.isFlipped !== true) {
                this.isFlipped = true;
                this.$emit('increment', 1);
                this.$emit('start-timer');
                this.$emit('card-id', this);
            }
        }
    }

});