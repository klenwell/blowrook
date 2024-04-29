class MatchModel {
    static loadById(id) {
        let matchData = sessionStorage.getItem(id);
        let match = new MatchModel(id);
        match.loadData(matchData);
        console.log('loadById', id, match);
        return match;
    }

    constructor(uuid) {
        this.id = uuid;
        this.state = 'new';
        this.rounds = [];
        this.moves = [];
        this.court = new CourtModel();
    }

    get round() {
        return this.rounds.length - 1;
    }

    get jsonData() {
        return {
            id: this.uid,
            state: this.state,
            round: this.round,
            rounds: this.rounds,
            moves: this.moves
        }
    }

    loadData(serialData) {
        let jsonData = JSON.parse(serialData);
        this.state = jsonData.state;
        this.rounds = jsonData.rounds;
        this.moves = jsonData.moves;
    }

    save() {
        sessionStorage.setItem(this.id, this.stringify());
    }

    addMove(rookMove) {
        console.log('addMove', rookMove);
        this.moves.push(rookMove);
    }

    scoreRound() {
        let scores = {};

        // Sort rooks smallest to largest
        let sortedRooks = this.moves.sort((a, b) => (a.r - b.r));
        let smallRook = sortedRooks[0];
        let bigRook = sortedRooks[1];

        // Compute Raw Scores
        smallRook.potentialScore = this.scoreRookMove(smallRook);
        bigRook.potentialScore = this.scoreRookMove(bigRook);

        // Check overlaps. If overlap, remove largest.
        if ( Circle.intersect(smallRook.circle, bigRook.circle) ) {
            bigRook.score = 0;
        }
        else {
            bigRook.score = bigRook.potentialScore;
        }

        smallRook.score = smallRook.potentialScore;

        // Return scores
        scores[smallRook.ownerId] = smallRook;
        scores[bigRook.ownerId] = bigRook;
        this.rounds.push(scores);
        console.log('scoreRound', scores, this.rounds);
        return scores;
    }

    scoreRookMove(rookMove) {
        let courtArea = Circle.intersectionArea(rookMove.circle, this.court.outerCircle);
        let bonusArea = Circle.intersectionArea(rookMove.circle, this.court.innerCircle);
        let rawScore = courtArea + (bonusArea * 3);
        console.log('scoreRookMove:', courtArea, bonusArea, rawScore);
        return Math.round(rawScore / 100);
    }

    stringify() {
        return JSON.stringify(this.jsonData);
    }
}
