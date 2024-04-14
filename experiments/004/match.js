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

    buildCourt(radius) {
        this.court = new Court(radius);
    }

    start() {
        const stageLength = this.court.radius * 2;
        this.#stage = this.initStage(this.selector, stageLength, stageLength);
        this.#layer = new Konva.Layer();
        this.#stage.add(this.#layer);

        console.log('start match:', this);
        this.render();
        this.enableNewRook();
    }

    enableNewRook() {
        this.#stage.on('pointerdown', (e) => { this.onClick(e) });
    }

    onClick() {
        var pointerPos = this.#stage.getPointerPosition();
        console.log('Clicked stage at', pointerPos);

        if ( ! this.newRook ) {
            let r = MatchConstants.min_rook_size;
            let rook = new Rook(r, pointerPos.x, pointerPos.y);
            this.addNewRook(rook);
            console.log('Added new rook:', this.newRook);
        }
        else {
            console.log('New rook already added.')
        }
    }

    render() {
        this.#layer.add(this.court.image);
        this.#layer.draw();
    }

    addNewRook(rook) {
        this.#layer.add(rook.image);
        this.#layer.draw();

        rook.makeDraggable();
        rook.image.on('dragmove', () => { this.constrainRook(rook) });

        this.newRook = rook;
    }

    constrainRook(rook) {
        const min_x = 0 + rook.radius;
        const max_x = this.#stage.width() - rook.radius;
        const min_y = 0 + rook.radius;
        const max_y = this.#stage.height() - rook.radius;

        let x = (rook.image.x() > max_x) ? max_x : rook.image.x();
        x = (rook.image.x() < min_x) ? min_x : x;
        let y = (rook.image.y() > max_x) ? max_y : rook.image.y();
        y = (rook.image.y() < min_x) ? min_y : y;

        rook.image.x(x);
        rook.image.y(y);
    }
}
