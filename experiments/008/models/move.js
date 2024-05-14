class Move {
    constructor(user) {
        this.user = user.id;
        this.value = Math.round(Math.random() * 100);
    }

    isValid() {
        const inValidRate = 0.2;
        return Math.random() > inValidRate;
    }
}
