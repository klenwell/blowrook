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

                if ( move.overlaps(otherMove) ) {
                    // Smaller rook wins conflict.
                    if ( move.rook.radius > otherMove.rook.radius ) {
                        move.deactivative();
                        return;
                    }
                }
            });

            roundMoves.push(move);

            let playerRoundScore = roundPlayerScores[move.player] ? roundPlayerScores[move.player] : 0;
            let moveScore = keeper.scoreMove(move);
            roundPlayerScores[move.player] = playerRoundScore + moveScore;
        });

        return {
            moves: roundMoves,
            scores: roundPlayerScores
        }
    }

    scoreMove(move) {
        throw 'TODO';
    }

    scoreMatch(match) {
    }
}
