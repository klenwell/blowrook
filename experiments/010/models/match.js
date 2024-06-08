class Match {
    constructor(params) {
        params = params ? params : {};
        this.players = params.players ? params.players : [];
        this.rink = params.rink;
        this.rounds = [];
    }

    get roundNumber() {
        return this.rounds.length;
    }

    get scores() {
        let scores = {};

        this.players.forEach((player) => {
            scores[player.id] = 0;
        });

        this.rounds.forEach((round) => {
            Object.keys(round.scores).forEach((playerId) => {
                scores[playerId] += round.scores[playerId];
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
