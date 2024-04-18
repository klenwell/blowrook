class Rook {
    resizeTransformer;
    resizeTransformerOn;

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

    get layer() {
        return this.image.getLayer();
    }

    isActive() {
        return this.state == 'active';
    }

    draw() {
        return new Konva.Circle({
            x: this.x,
            y: this.y,
            radius: this.radius,
            fill: this.color,
            draggable: true,
            opacity: 0.75
          });
    }

    redraw() {
        this.image.radius(this.radius);
        this.image.x(this.x);
        this.image.y(this.y);
        this.image.draw();
    }

    activate() {
        this.state = 'active';
        this.addDragListener();
        this.addTransformListener();
    }

    addDragListener() {
        this.image.draggable('true');
        this.image.on('dragstart', (e) => { this.onDragStart(e) });
        this.image.on('dragmove', (e) => { this.onDrag(e) });
        this.image.on('dragend', (e) => { this.onDragEnd(e) });
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

    addTransformListener() {
        /*
        This could be its own class called by Court.
        let resizer = new RookResizer(rook, court);
        **/
        this.image.on('click tap', (e) => { this.toggleTransformer(e) });
        this.image.on('transformend', (e) => { this.endResize(e) });

        this.resizeTransformer = new Konva.Transformer({
            nodes: [],
            keepRatio: true,
            enabledAnchors: [
              'top-left',
              'top-right',
              'bottom-right',
              'bottom-left'
            ],
            rotateEnabled: false,
            boundBoxFunc: (oldBox, newBox) => { return this.bindResize(oldBox, newBox) }
          });
          this.layer.add(this.resizeTransformer);

          this.resizeTransformerOn = false;
    }

    bindResize(oldBoundBox, newBoundBox) {
        function tooSmall(box) {
            const MIN_SIZE = 20;
            return box.width < MIN_SIZE;
        }

        if ( tooSmall(newBoundBox) ) {
            console.warn('Resizing too small!');
            return oldBoundBox;
        }

        // "boundBox" is an object with x, y, width, height and rotation properties
        function outOfBounds(box, stage) {
            var min_x = 0;
            var max_x = stage.width();
            var min_y = 0;
            var max_y = stage.height();
            var bx_end = box.x + Math.abs(box.width);
            var by_end = box.y + Math.abs(box.height);

            if (
                box.x < min_x ||
                bx_end > max_x ||
                box.y < min_y ||
                by_end > max_y
            ) {
                return true;
            }

            return false;
        }

        if ( outOfBounds(newBoundBox, this.image.getStage()) ) {
            console.warn('Resizing out of bounds!');
            return oldBoundBox;
        }

        return newBoundBox;
    }

    toggleTransformer(event) {
        if ( ! this.isActive() ) {
            return;
        }

        if ( this.resizeTransformerOn ) {
            this.resizeTransformer.nodes([]);
            this.resizeTransformerOn = false;
        }
        else {
            this.resizeTransformer.nodes([this.image]);
            this.resizeTransformerOn = true;
        }
    }

    endResize(event) {
        this.radius = this.radius * Math.abs(this.image.scaleX());
        this.x = this.image.x()
        this.y = this.image.y()
        this.image.scaleX(1);
        this.image.scaleY(1);
        console.log('resized', this.toJson());
        this.redraw();
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
