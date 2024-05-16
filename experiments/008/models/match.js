class Match {
    constructor() {
        this.user;
        this.opponent;
        this.rounds = [];
    }

    get roundNumber() {
        return this.rounds.length + 1;
    }

    get scores() {
        let userScore = 0;
        let oppScore = 0;

        this.rounds.forEach((round) => {
            userScore += round.scores.user;
            oppScore += round.scores.opponent;
        });

        return {
            user: userScore,
            opponent: oppScore
        }
    }

    addRound(round) {
        this.rounds.push(round);
    }

    isOver() {
        return this.roundNumber >= 3  && ! this.scoreIsTied();
    }

    scoreIsTied() {
        return false;
    }
}
