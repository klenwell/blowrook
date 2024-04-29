class RookMove {
    constructor(minRook, ownerId) {
        this.x = minRook.x;
        this.y = minRook.y;
        this.r = minRook.r;
        this.ownerId = ownerId;
        this.potentialScore = 0;
        this.score = 0;
    }

    get circle() {
        return {
            x: this.x,
            y: this.y,
            r: this.r
        }
    }
}
