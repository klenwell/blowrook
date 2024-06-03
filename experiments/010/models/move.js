class Move {
    constructor(params) {
        this.player = params.player;
        this.rook = params.rook;
        this.score = params.score ? params.score : 0;
    }
}
