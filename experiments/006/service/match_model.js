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

    addMove(params) {
        let rookMove = new RookMove(params);
        this.moves.push(rookMove);
    }

    scoreRound() {
        let scores = {};

        // Sort rooks smallest to largest
        let sortedRooks = this.moves.sort((a, b) => (a.r - b.r));
        let smallRook = sortedRooks[0];
        let bigRook = sortedRooks[1];

        // Check overlaps. If overlap, remove largest.
        if ( circle.intersect(smallRook.circle, bigRook.circle) ) {
            bigRook.score = 0;
        }
        else {
            bigRook.score = this.scoreRookMove(bigRook);
        }

        smallRook.score = this.scoreRookMove(smallRook);

       // Return scores
       scores[smallRook.owner] = smallRook;
       scores[bigRook.owner] = bigRook;
       this.rounds.push(scores);
       return scores;
    }

    scoreRookMove(rookMove) {
        let courtArea = circle.intersectionArea(rookMove.circle, this.court.outerCircle);
        let bonusArea = circle.intersectionArea(rookMove.circle, this.court.innerCircle);
        return courtArea + (bonusArea * 3);
    }

    stringify() {
        let jsonData = {
            id: this.id,
            round: this.round
        }
        return JSON.stringify(jsonData);
    }
}
