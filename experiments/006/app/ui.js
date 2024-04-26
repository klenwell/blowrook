class BlowrookUI {
    constructor(app) {
        this.app = app;
    }

    init() {
        this.stage = this.initStage(this.app.settings.selector, this.app.court);
        this.layer = new Konva.Layer();
        this.court = this.app.court.draw();
        this.rook = null;
        this.rookTransformer = null;
        this.rookTransformerOn = false;

        this.stage.add(this.layer);
        this.layer.add(this.court);
        this.layer.draw();

        this.button = $('#move');
        this.button.hide();

        this.addCourtListeners();
        this.addButtonListener();
    }

    initStage(selector, court) {
        // https://konvajs.org/docs/overview.html
        return new Konva.Stage({
            container: selector,
            width: court.radius*2,
            height: court.radius*2
        });
    }

    rookInCourt(rook, court) {

    }

    /*
     * Listeners
    **/
    addCourtListeners() {
        this.court.draggable(true);
        this.court.on('dragstart', (e) => { this.placeRook(e) });
        this.court.on('dragmove', (e) => { this.stretchRook(e) });
        this.court.on('dragend', (e) => { this.activateRook(e) });
    }

    addButtonListener(event) {
        this.button.on('click', (e) => { this.postMove(e) });
    }

    addRookListeners() {
        // Make rook moveable
        this.rook.draggable(true);
        this.rook.on('dragstart', (e) => { this.startRookDrag(e) });
        this.rook.on('dragmove', (e) => { this.dragRook(e) });
        this.rook.on('dragend', (e) => { this.endRookDrag(e) });

        // Make rook resizeable
        this.addRookTransformer();
        this.rook.on('click tap', (e) => { this.toggleRookResizer(e) });
        this.rook.on('transform', (e) => { this.resizeRook(e) })
        this.rook.on('transformend', (e) => { this.endRookResize(e) });
    }

    addRookTransformer() {
        this.rookTransformer = new Konva.Transformer({
            nodes: [],
            keepRatio: true,
            enabledAnchors: [
              'top-left',
              'top-right',
              'bottom-right',
              'bottom-left'
            ],
            rotateEnabled: false,
            boundBoxFunc: (oldBox, newBox) => { return this.bindRookResize(oldBox, newBox) }
        });

        this.layer.add(this.rookTransformer);
    }

    bindRookResize(oldBoundBox, newBoundBox) {
        const courtLength = this.app.court.length;
        const minBoxSize = this.app.settings.minRookRadius * 2;

        if ( newBoundBox.width < minBoxSize ) {
            console.warn('Resizing too small!');
            return oldBoundBox;
        }

        // "boundBox" is an object with x, y, width, height and rotation properties
        function outOfBounds(box, courtLength) {
            var min_d = 0;
            var max_d = courtLength;
            var bx_end = box.x + Math.abs(box.width);
            var by_end = box.y + Math.abs(box.height);

            if (
                box.x < min_d ||
                bx_end > max_d ||
                box.y < min_d ||
                by_end > max_d
            ) {
                return true;
            }

            return false;
        }

        if ( outOfBounds(newBoundBox, courtLength) ) {
            console.warn('Resizing out of bounds!');
            return oldBoundBox;
        }

        return newBoundBox;
    }

    /*
     * Events
    **/
    placeRook(event) {
        var pointerPos = this.stage.getPointerPosition();

        this.rook = new Konva.Circle({
            x: pointerPos.x,
            y: pointerPos.y,
            radius: this.app.settings.minRookRadius,
            fill: this.app.settings.userColor,
            draggable: true,
            opacity: 0.75
          });

        this.layer.add(this.rook);
        console.log('placeRook:', this.rook);
    }

    stretchRook(event) {
        const pointerPos = this.rook.getRelativePointerPosition();
        const dx = pointerPos.x
        const dy = pointerPos.y;
        const r = Math.sqrt(dx*dx + dy*dy);

        let rook = {
            x: this.rook.x(),
            y: this.rook.y(),
            r: r
        };

        if ( ! this.app.court.rookInBounds(rook) ) {
            console.warn('Out of Bounds. Stop!');
            return false;
        }

        this.rook.radius(r);
    }

    activateRook(event) {
        this.addRookListeners();
        this.button.show();
        this.court.draggable(false);
    }

    startRookDrag(event) {
        console.log(event, this.debugRook(this.rook));
    }

    dragRook(event) {
        let rook = this.scaleRook(this.rook)
        const min_d = 0 + rook.r;
        const max_d = this.app.court.length - rook.r;

        let x = (rook.x > max_d) ? max_d : rook.x;
        x = (rook.x < min_d) ? min_d : x;
        let y = (rook.y > max_d) ? max_d : rook.y;
        y = (rook.y < min_d) ? min_d : y;

        this.rook.x(x);
        this.rook.y(y);
    }

    endRookDrag(event) {
        console.log(event, this.debugRook(this.rook));
    }

    toggleRookResizer(event) {
        if ( this.rookTransformerOn ) {
            this.rookTransformer.nodes([]);
            this.rookTransformerOn = false;
        }
        else {
            this.rookTransformer.nodes([this.rook]);
            this.rookTransformerOn = true;
        }
    }

    resizeRook(event) {
        console.log(event, this.debugRook(this.rook), this.scaleRook(this.rook));
    }

    endRookResize(event) {
        console.log(event, this.debugRook(this.rook), this.scaleRook(this.rook));
    }

    postMove(event) {
        console.log(event);

        if ( ! this.rook ) {
            alert('You need to place your rook!');
            return;
        }

        let minRook = this.scaleRook(this.rook)
        let response = this.app.apiClient.postMove(minRook);
        this.app.match.update(response);
    }

    /*
     * Utility methods
    **/
    scaleRook(rook) {
        let scale = Math.abs(rook.scaleX());
        let radius = rook.getAttr('radius');

        return {
            x: rook.x(),
            y: rook.y(),
            r: radius * scale
        }
    }

    debugRook(rook) {
        return { x: rook.x(), y: rook.y(), r: rook.getAttr('radius') }
    }
}
