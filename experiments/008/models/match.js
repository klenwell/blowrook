class Match {
    constructor() {
        this.round = 0;
    }

    isOver() {
        return this.round >= 3  && ! this.scoreIsTied();
    }

    scoreIsTied() {
        return false;
    }
}
