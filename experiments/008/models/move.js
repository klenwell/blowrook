class Move {
    constructor(user) {
        this.user = user.id;
        this.value = Math.round(Math.random() * 100);
    }

    isValid() {
        const validRate = 0.75;
        return Math.random() < validRate;
    }
}
