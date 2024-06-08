class Referee {
    constructor(match) {
        this.match = match;
        this.rink = match.rink;
    }

    isValidMove(move) {
        if ( ! this.rink.containsRook(move.rook) ) {
            return false;
        }

        return true;
    }
}
