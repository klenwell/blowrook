class Court {
    #stage;
    #layer;

    constructor(selector, radius) {
        this.selector = selector
        this.radius = radius;
        this.rooks = [];
        this.image = this.draw();

        this.#stage = this.initStage(selector, radius*2, radius*2);
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
    }

    render() {
        this.#layer.add(this.image);

        this.rooks.forEach((rook) => {
            this.#layer.add(rook.image);
        });

        this.#layer.draw();
    }
}
