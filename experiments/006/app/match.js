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
        this.aiMove = data.ai_move;
        this.userMove = data.user_move;
        this.app.ui.updateResult(data);
    }

}
