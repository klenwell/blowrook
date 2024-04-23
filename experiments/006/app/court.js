class Court {
    constructor(app) {
        this.app = app;
        this.radius = app.settings.courtRadius;
        this.centerRadius = app.settings.centerRadius;
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
