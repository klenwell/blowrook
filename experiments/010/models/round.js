class Round {
    constructor(params) {
        this.number = params.number;
        this.moves = params.moves ? params.moves : [];
    }

    get scores() {
        let scores = {};

        this.moves.forEach((move) => {
            let playerId = move.player.id;
            let score = move.score;

            if (scores[playerId]) {
                scores[playerId] += score;
            }
            else {
                scores[playerId] = score;
            }
        });

        return scores;
    }

    get activeMoves() {
        let activeMoves = [];
        this.moves.forEach((move) => {
            if ( move.isActive() ) {
                activeMoves.push(move);
            }
        });
        return activeMoves;
    }

    addMove(move) {
        this.moves.push(move);
    }

    movesByPlayer(player) {
        return this.moves.filter((move) => move.player.id === player.id);
    }
}
