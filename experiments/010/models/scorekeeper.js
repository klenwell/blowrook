class Scorekeeper {
    constructor(match) {
        this.match = match;
        this.rink = match.rink;
    }

    scoreRound(round) {
        let roundMoves = [];
        let roundPlayerScores = {};
        let keeper = this;

        round.activeMoves.forEach((move) => {
            round.activeMoves.forEach((otherMove) => {
                if ( move === otherMove ) {
                    return;
                }

                if ( move.conflictsWith(otherMove) ) {
                    // Smaller rook wins conflict.
                    if ( move.rook.radius > otherMove.rook.radius ) {
                        move.deactivate();
                        return;
                    }
                }
            });

            roundMoves.push(move);

            let playerRoundScore = roundPlayerScores[move.player.id] ? roundPlayerScores[move.player.id] : 0;
            let moveScore = keeper.scoreMove(move);
            roundPlayerScores[move.player.id] = playerRoundScore + moveScore;
        });

        return {
            moves: roundMoves,
            scores: roundPlayerScores
        }
    }

    scoreMove(move) {
        if ( ! move.isActive() ) {
            return 0;
        }

        const outerOverlap = Circle.overlapArea(this.rink.circle, move.rook.circle);
        const innerOverlap = Circle.overlapArea(this.rink.innerCircle, move.rook.circle);
        const areaScore = outerOverlap + (2 * innerOverlap)
        return Math.round(areaScore / 100);
    }

    scoreMatch(match) {
    }
}
