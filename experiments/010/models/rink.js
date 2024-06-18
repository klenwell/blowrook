const RinkDimensions = {
    X: 100,
    Y: 100,
    R: 100,
    INNER_R: 33
}

class Rink {
    constructor() {
        this.radius = RinkDimensions.R;
        this.innerRadius = RinkDimensions.INNER_R;
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

    get innerCircle() {
        return {
            r: this.innerRadius,
            x: this.x,
            y: this.y
        }
    }

    containsRook(rook) {
        return this.radius >= rook.radius && Circle.containsCircle(this.circle, rook.circle);
    }
}
