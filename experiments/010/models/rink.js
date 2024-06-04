const RinkDimensions = {
    X: 100,
    Y: 100,
    R: 100
}

class Rink {
    constructor() {
        this.radius = RinkDimensions.R;
        this.x = RinkDimensions.X;
        this.y = RinkDimensions.Y;
    }

    get circle() {
        return {
            r: this.radius,
            x: this.x,
            y: this.y
        }
    }

    containsRook(rook) {
        return this.radius >= rook.radius && Circle.containsCircle(this.circle, rook.circle);
    }
}
