class Move {
    constructor(user) {
        this.user = user.id;
        this.value = Math.round(Math.random() * 100);
    }

    isValid() {
        const validRate = 0.5;
        return Math.random() < validRate;
    }
}
