const MatchConstants = {
    min_rook_size: 4
}

class Match {
    #stage;
    #layer;

    constructor(selector) {
        this.selector = selector;
        this.court = undefined;
        this.newRook = undefined;
    }

    initStage(selector, width, height) {
        // https://konvajs.org/docs/overview.html
        return new Konva.Stage({
            container: selector,
            width: width,
            height: height
        });
    }

    buildCourt(radius, centerRadius) {
        this.court = new Court(radius, centerRadius);
    }

    start() {
        const stageLength = this.court.radius * 2;
        this.#stage = this.initStage(this.selector, stageLength, stageLength);
        this.#layer = new Konva.Layer();
        this.#stage.add(this.#layer);

        console.log('start match:', this);
        this.render();
        this.listenForNewRook();
    }

    listenForNewRook() {
        this.#stage.on('newRookAdded', (e) => { this.addNewRook(this.court.newRook) });
    }

    render() {
        this.#layer.add(this.court.image);
        this.#layer.draw();
    }

    addNewRook(rook) {
        console.log('caught newRookAdded event');
        this.#layer.add(rook.image);
        this.#layer.draw();
    }
}
