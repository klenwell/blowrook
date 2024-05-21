class AiOpponent {
    constructor() {
        this.id = 'ai';
        this.name = 'AI';
    }

    makeMove() {
        return new Move(this);
    }
}
