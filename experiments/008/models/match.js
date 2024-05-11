class Match {
    constructor() {
        this.round = 0;
        this.user;
        this.opponent;
    }

    isOver() {
        return this.round >= 3  && ! this.scoreIsTied();
    }

    scoreIsTied() {
        return false;
    }
}
