class Match {
    constructor(params) {
        this.players = params.players ? params.players : [];
        this.rounds = [];
    }

    get roundNumber() {
        return this.rounds.length;
    }

    get scores() {
        let scores = {};

        this.rounds.forEach((round) => {
            Object.keys(round.scores).forEach((playerId) => {
                if (scores[playerId]) {
                    scores[playerId] += round.scores[playerId];
                }
                else {
                    scores[playerId] = round.scores[playerId];
                }
            });
        });

        return scores;
    }

    addPlayer(player) {
        this.players.push(player);
    }

    addRound(round) {
        this.rounds.push(round);
    }
}
