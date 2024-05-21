class Round {
    constructor(number) {
        this.number = number;
        this.userMove = null;
        this.opponentMove = null;
        this.scores = {
            user: 0,
            opponent: 0
        };
    }

    process(roundData) {
        console.log(roundData);
        this.userMove = roundData.user_move;
        this.opponentMove = roundData.opponent_move;
        this.scores.user = roundData.user_move.value;
        this.scores.opponent = roundData.opponent_move.value;
    }

    isComplete() {
        return this.userMove && this.opponentMove;
    }
}
