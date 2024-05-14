class Match {
    constructor() {
        this.user;
        this.opponent;
        this.rounds = [];
    }

    get roundNumber() {
        return this.rounds.length + 1;
    }

    isOver() {
        return this.roundNumber >= 3  && ! this.scoreIsTied();
    }

    scoreIsTied() {
        return false;
    }
}
