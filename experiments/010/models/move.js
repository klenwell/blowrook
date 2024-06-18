class Move {
    constructor(params) {
        this.player = params.player;
        this.rook = params.rook;
        this.round = params.round;
        this.score = params.score ? params.score : 0;
        this.status = params.status ? params.status : 'active';
    }

    isActive() {
        return this.status === 'active';
    }

    conflictsWith(otherMove) {
        if ( this.player === otherMove.player ) {
            return false;
        }

        const thisCircle = this.rook.circle;
        const otherCircle = otherMove.rook.circle;
        return Circle.overlapsCircle(thisCircle, otherCircle);
    }

    deactivate() {
        this.status = 'inactive';
    }
}
