class Court {
    constructor(radius) {
        this.radius = radius;
        this.image = this.draw();
        this.makeClickable();
    }

    draw() {
        return new Konva.Circle({
            x: this.radius,
            y: this.radius,
            radius: this.radius,
            fill: 'white',
            stroke: 'red',
            strokeWidth: 1
        });
    }

    makeClickable() {
        this.image.on('pointerdown', (e) => { this.onClick(e) });
    }

    onClick(event) {
        const stage = this.image.getStage();
        var pointerPos = stage.getPointerPosition();
        console.log('Clicked court at:', [pointerPos.x, pointerPos.y], [event.evt.layerX, event.evt.layerY]);
    }
}
