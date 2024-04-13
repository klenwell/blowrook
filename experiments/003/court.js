class Court {
    #stage;
    #layer;

    constructor(selector, radius) {
        this.selector = selector
        this.radius = radius;

        this.#stage = this.initStage(selector, radius*2, radius*2);
        this.#layer = new Konva.Layer();
        this.#stage.add(this.#layer);

        this.drawSurface();
    }

    initStage(selector, width, height) {
        // https://konvajs.org/docs/overview.html
        return new Konva.Stage({
            container: selector,
            width: width,
            height: height
          });
    }

    drawSurface() {
        const surface = new Konva.Circle({
            x: this.radius,
            y: this.radius,
            radius: this.radius,
            fill: 'white',
            stroke: 'red',
            strokeWidth: 1
          });

          this.#layer.add(surface);
    }

    draw() {
        this.#layer.draw();
    }
}
