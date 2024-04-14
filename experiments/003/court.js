class Court {
    #stage;
    #layer;

    constructor(selector, radius) {
        this.selector = selector
        this.radius = radius;
        this.width = radius*2;
        this.height = radius*2;
        this.rooks = [];
        this.image = this.draw();

        this.#stage = this.initStage(selector, this.width, this.height);
        this.#layer = new Konva.Layer();
        this.#stage.add(this.#layer);
    }

    initStage(selector, width, height) {
        // https://konvajs.org/docs/overview.html
        return new Konva.Stage({
            container: selector,
            width: width,
            height: height
        });
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

    addRook(rook) {
        this.rooks.push(rook);
        rook.makeDraggable();
        rook.image.on('dragmove', () => { this.containRook(rook) });
    }

    containRook(rook) {
        const min_x = 0 + rook.radius;
        const max_x = this.width - rook.radius;
        const min_y = 0 + rook.radius;
        const max_y = this.height - rook.radius;

        let x = (rook.image.x() > max_x) ? max_x : rook.image.x();
        x = (rook.image.x() < min_x) ? min_x : x;
        let y = (rook.image.y() > max_x) ? max_y : rook.image.y();
        y = (rook.image.y() < min_x) ? min_y : y;

        rook.image.x(x);
        rook.image.y(y);
    }

    render() {
        this.#layer.add(this.image);

        this.rooks.forEach((rook) => {
            this.#layer.add(rook.image);
        });

        this.#layer.draw();
    }
}
