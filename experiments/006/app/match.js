class BlowrookMatch {
    constructor(app) {
        this.app = app;
    }

    start(matchData) {
        this.id = matchData.match_id;
        this.round = 1;
        console.log('BlowrookMatch.start', this);
    }

    update(data) {
        console.log(data);
        this.round = data.round;
        this.score = data.score;
    }
}
