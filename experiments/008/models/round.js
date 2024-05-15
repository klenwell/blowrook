class Round {
    constructor(number) {
        this.number = number;
        this.userMove = null;
        this.opponentMove = null;
    }

    process(params) {
        this.userMove = params.user_move;
        this.opponentMove = params.opponent_move;
    }

    isComplete() {
        return this.userMove && this.opponentMove;
    }
}
