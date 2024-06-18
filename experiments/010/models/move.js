class Move {
    constructor(params) {
        this.player = params.player;
        this.rook = params.rook;
        this.round = params.round;
        this.score = params.score ? params.score : 0;
        this.status = params.status ? params.status : 'active';
    }

    isActive() {
        return this.status == 'active';
    }

    overlaps(otherMove) {
        throw 'TODO';
    }

    deactivate() {
        this.status = 'inactive';
    }
}
