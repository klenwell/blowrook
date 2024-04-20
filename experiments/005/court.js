class Court {
    constructor(radius) {
        this.radius = radius;
        this.image = this.draw();
        this.makeClickable();
        this.makeDraggable();
        this.newRook = undefined;
    }

    draw() {
        let image = new Konva.Circle({
            x: this.radius,
            y: this.radius,
            radius: this.radius,
            fill: 'white',
            stroke: 'red',
            strokeWidth: 1,
            draggable: true
        });

        // Enable drag on court but keep the court in place.
        // https://stackoverflow.com/a/40259113/1093087
        image.setAttr('dragBoundFunc', () => {
            var pos = image.getAbsolutePosition();
            return {x: pos.x, y: pos.y};
        });

        return image;
    }

    makeClickable() {
        this.image.on('pointerdown', (e) => { this.onClick(e) });
    }

    onClick(event) {
        const stage = this.image.getStage();
        var pointerPos = stage.getPointerPosition();
        console.log('Clicked court at:', [pointerPos.x, pointerPos.y], [event.evt.layerX, event.evt.layerY]);
    }

    makeDraggable() {
        this.image.on('dragstart', (e) => { this.createRook(e) });
        this.image.on('dragmove', (e) => { this.resizeRook(e) });
        this.image.on('dragend', (e) => { this.activateRook(e) });
    }

    createRook(event) {
        if ( this.newRook ) {
            console.log('Rook already added:', this.newRook);
            this.image.draggable('false');
            return;
        }

        const stage = this.image.getStage();
        const layer = this.image.getLayer();
        var pointerPos = stage.getPointerPosition();
        console.log('Create new rook at point', pointerPos);

        this.newRook = new Rook(1, pointerPos.x, pointerPos.y);
        layer.add(this.newRook.image);

        console.log('createRook:', this.newRook);
    }

    resizeRook(event) {
        if ( ! this.newRook || this.newRook.state != 'new' ) {
            return;
        }

        const stage = this.image.getStage();
        const pointerPos = stage.getPointerPosition();

        const dx = pointerPos.x - this.newRook.x;
        const dy = pointerPos.y - this.newRook.y;
        const r = Math.sqrt(dx*dx + dy*dy);

        // Keep rook in stage
        const min_x = 0 + r;
        const max_x = stage.width() - r;
        const min_y = 0 + r;
        const max_y = stage.height() - r;

        if ( this.newRook.x < min_x || this.newRook.x > max_x ) {
            console.warn('Out of Bounds. Stop!');
            return;
        }
        if ( this.newRook.y < min_y || this.newRook.y > max_y ) {
            console.warn('Out of Bounds. Stop!');
            return;
        }

        this.newRook.radius = r;
        this.newRook.redraw();
        console.log('resizeRook:', pointerPos, [dx, dy], this.newRook.toJson());
    }

    activateRook(event) {
        const stage = this.image.getStage();
        this.newRook.activate();
        this.newRook.image.on('dragmove', (e) => { this.constrainRook(this.newRook); });
        stage.fire('newRookAdded');
        this.image.draggable(false);
    }

    constrainRook(rook) {
        const stage = this.image.getStage();
        const min_x = 0 + rook.radius;
        const max_x = stage.width() - rook.radius;
        const min_y = 0 + rook.radius;
        const max_y = stage.height() - rook.radius;

        let x = (rook.image.x() > max_x) ? max_x : rook.image.x();
        x = (rook.image.x() < min_x) ? min_x : x;
        let y = (rook.image.y() > max_x) ? max_y : rook.image.y();
        y = (rook.image.y() < min_x) ? min_y : y;

        rook.image.x(x);
        rook.image.y(y);
    }
}
