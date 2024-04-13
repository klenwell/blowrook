class Rook {
    constructor(r, x, y) {
        this.radius = r;
        this.x = x;
        this.y = y;
        this.image = this.draw();
    }

    get pt() {
        return [this.x, this.y];
    }

    get area() {
        return Math.round(Math.PI * this.radius * this.radius);
    }

    draw() {
        return new Konva.Circle({
            x: this.x,
            y: this.y,
            radius: this.radius,
            fill: 'blue'
          });
    }

    makeDraggable() {
    }

    onDragStart(event) {
        console.log('drag started', this, event)
    }

    onDrag(event) {
        d3.select(this).attr("cx", event.x).attr("cy", event.y);
    }

    onDragEnd(event) {
        this.x = event.x;
        this.y = event.y;
        console.log('drag ended', this.pt)
    }
}
