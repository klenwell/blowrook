class Rook {
    constructor(r, x, y) {
        this.radius = r;
        this.x = x;
        this.y = y;
        this.color = 'blue';
        this.state = 'new';
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
            fill: this.color,
            draggable: true,
            opacity: 0.9
          });
    }

    redraw() {
        this.image.radius(this.radius);
        this.image.x(this.x);
        this.image.y(this.y);
        this.image.draw();
    }

    makeDraggable() {
        this.image.draggable('true');
        this.image.on('dragstart', (e) => { this.onDragStart(e) });
        this.image.on('dragmove', (e) => { this.onDrag(e) });
        this.image.on('dragend', (e) => { this.onDragEnd(e) });
    }

    activate() {
        this.state = 'active';
        this.makeDraggable();
    }

    onDragStart(event) {
        console.log('drag started', this.toJson(), event)
    }

    onDrag(event) {
        if ( this.state != 'active' ) {
            return;
        }
        this.x = this.image.x();
        this.y = this.image.y();
    }

    onDragEnd(event) {
        this.x = this.image.x();
        this.y = this.image.y();
        console.log('drag ended', this.toJson())
    }

    toJson() {
        return {
            'x': this.x,
            'y': this.y,
            'r': this.radius,
            'state': this.state
        }
    }
}
