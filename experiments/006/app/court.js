class Court {
    constructor(app) {
        this.app = app;
        this.radius = app.settings.courtRadius;
        this.centerRadius = app.settings.centerRadius;
        this.length = this.radius * 2;
    }

    rookInBounds(rook) {
        const min_d = 0 + rook.r;
        const max_d = this.length - rook.r;

        if ( rook.x < min_d || rook.x > max_d ) {
            return false;
        }

        if ( rook.y < min_d || rook.y > max_d ) {
            return false;
        }

        return true;
    }

    draw() {
        let image = new Konva.Group({
            x: 0,
            y: 0
        });

        let courtImage = new Konva.Circle({
            x: this.radius,
            y: this.radius,
            radius: this.radius,
            fill: 'white',
            stroke: '#CC0000',
            strokeWidth: 1
        });

        let centerImage = new Konva.Circle({
            x: this.radius,
            y: this.radius,
            radius: this.centerRadius,
            fill: '#CC0000'
        });

        // Enable drag on court but keep the court in place.
        // https://stackoverflow.com/a/40259113/1093087
        image.setAttr('dragBoundFunc', () => {
            var pos = image.getAbsolutePosition();
            return {x: pos.x, y: pos.y};
        });

        image.add(courtImage);
        image.add(centerImage);

        return image;
    }
}
