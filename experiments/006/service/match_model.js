class MatchModel {
    static loadById(id) {
        let matchData = sessionStorage.getItem(id);
        let data = JSON.parse(matchData);
        let match = new MatchModel(id);
        console.log(data, match);
        return match;
    }

    constructor(uuid) {
        this.court = new CourtModel();
        this.id = uuid;
        this.rounds = [];
        this.moves = []
    }

    get round() {
        return this.rounds.length - 1;
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
        let jsonData = {
            id: this.id,
            round: this.round
        }
        return JSON.stringify(jsonData);
    }
}
