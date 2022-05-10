Vue.component('timer', {
    props: ['timer', 'initflipcount'],

    template: `
    
        <div class="statusbar">
        <div>
            <h2 id="timer">Timer: {{ timer }}</h2>
            <h2 id="flipcount">Flips: {{ initflipcount }}</h2>
        </div>
        </div>
    `
})