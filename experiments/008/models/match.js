class Match {
    constructor() {
        this.round = 0;
        this.player;
        this.opponent;
    }

    savePlayer(name) {
        this.player = ( name ) ? name : 'Player';
    }

    isOver() {
        return this.round >= 3  && ! this.scoreIsTied();
    }

    scoreIsTied() {
        return false;
    }
}
