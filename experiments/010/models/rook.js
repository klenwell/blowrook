class Rook {
    constructor(params) {
        this.playerId = params.playerId;
        this.radius = params.r;
        this.x = params.x;
        this.y = params.y;
    }

    get circle() {
        return {
            r: this.radius,
            x: this.x,
            y: this.y
        }
    }
}
