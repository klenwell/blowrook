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
            this.updateCircleData(rook);
        });
    }

    listenForRookMoved() {
        this.#stage.on('rookMoved', (e) => {
            const rook = e.rook;
            this.updateCircleData(rook);
        });
    }

    intersectionArea(c1, c2) {
        // Not overlapping
        var d = Math.hypot(c2['x'] - c1['x'], c2['y'] - c1['y']);
        if (d > c1['r'] + c2['r']) {
             return 0;
        }

        // Totally overlapping
        if (d <= Math.abs(c2['r'] - c1['r'])) {
            var r1 = c1['r'] * c1['r'];
            var r2 = c2['r'] * c2['r'];
            return Math.PI * Math.min(r1, r2);
        }

        // https://math.stackexchange.com/a/290526
        var x0 = c1.x;
        var y0 = c1.y;
        var r0 = c1.r;
        var x1 = c2.x;
        var y1 = c2.y;
        var r1 = c2.r;

        var rr0 = r0*r0;
        var rr1 = r1*r1;
        var c = Math.sqrt((x1-x0)*(x1-x0) + (y1-y0)*(y1-y0));
        var phi = (Math.acos((rr0+(c*c)-rr1) / (2*r0*c)))*2;
        var theta = (Math.acos((rr1+(c*c)-rr0) / (2*r1*c)))*2;
        var area1 = 0.5*theta*rr1 - 0.5*rr1*Math.sin(theta);
        var area2 = 0.5*phi*rr0 - 0.5*rr0*Math.sin(phi);
        return area1 + area2;
    }

    updateCircleData(rook) {
        const rookC = {x: rook.x, y: rook.y, r: rook.radius};
        const courtR = this.court.radius;

        const outerC = {x: courtR, y: courtR, r: courtR};
        const centerC = {x: courtR, y: courtR, r: this.court.centerRadius};
        let $el = (id) => { return document.getElementById(id); }

        $el('circle-point').innerText = `(${Math.round(rookC.x)}, ${Math.round(rookC.y)})`;
        $el('circle-area').innerText = Circle.area(rookC).toFixed(2);
        $el('court-overlap').innerText = this.intersectionArea(rookC, outerC).toFixed(2);
        $el('center-overlap').innerText = this.intersectionArea(rookC, centerC).toFixed(2);
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
