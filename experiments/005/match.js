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
        this.listenForRookResized();
        this.listenForRookMoved();
    }

    listenForNewRook() {
        this.#stage.on('newRookAdded', (e) => { this.addNewRook(this.court.newRook) });
        window.addEventListener('newRookAdded', function(event) {
            console.log('window caught newRookAdded', event);

        });
    }

    listenForRookResized() {
        this.#stage.on('rookResized', (e) => {
            const rook = e.rook;
            this.updateCirclePt(rook);
            this.updateCircleArea(rook);
        });
    }

    listenForRookMoved() {
        this.#stage.on('rookMoved', (e) => {
            const rook = e.rook;
            this.updateCirclePt(rook);
        });
    }

    updateCirclePt(rook) {
        let el = document.getElementById('circle-point');
        el.innerText = `(${Math.round(rook.x)}, ${Math.round(rook.y)})`;
    }

    updateCircleArea(rook) {
        let el = document.getElementById('circle-area');
        const c = {x: rook.x, y: rook.y, r: rook.radius};
        el.innerText = Circle.area(c).toFixed(2);
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
