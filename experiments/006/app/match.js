class BlowrookMatch {
    constructor(app) {
        this.app = app;
    }

    start(matchData) {
        this.round = 1;
        console.log('start match');
    }

    update(data) {
        console.log(data);
        this.round = data.round;
        this.score = data.score;
    }
}
