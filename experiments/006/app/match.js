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

        if ( this.userMove.score > this.aiMove.score ) {
            console.log('You win:', this.userMove.score, this.aiMove.score)
        }
        else if ( this.userMove.score < this.aiMove.score ) {
            console.log('You lose:', this.userMove.score, this.aiMove.score)
        }
        else {
            console.log('Tie', this.userMove.score, this.aiMove.score)
        }
    }
}
