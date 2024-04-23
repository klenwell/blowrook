class BlowrookUI {
    constructor(app) {
        this.app = app;
    }

    init() {
        this.stage = this.initStage(this.app.settings.selector, this.app.court);
        this.layer = new Konva.Layer();
        this.court = this.app.court.draw();
        this.rook = null;

        this.stage.add(this.layer);
        this.layer.add(this.court);
        this.layer.draw();

        this.addCourtListeners();
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
        this.court.on('dragmove', (e) => { this.resizeRook(e) });
        this.court.on('dragend', (e) => { this.activateRook(e) });
    }

    addRookListeners() {
        this.rook.draggable(true);
        this.rook.on('dragstart', (e) => { this.startRookDrag(e) });
        this.rook.on('dragmove', (e) => { this.dragRook(e) });
        this.rook.on('dragend', (e) => { this.endRookDrag(e) });
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

    resizeRook(event) {
        const pointerPos = this.rook.getRelativePointerPosition();
        const rookPos = this.rook.position();
        const courtWidth = this.court.getAttr('radius') * 2;

        const dx = pointerPos.x
        const dy = pointerPos.y;
        const r = Math.sqrt(dx*dx + dy*dy);

        function rookInCourt(r, rookPos, courtWidth) {
            const min_x = 0 + r;
            const max_x = courtWidth - r;
            const min_y = 0 + r;
            const max_y = courtWidth - r;

            if ( rookPos.x < min_x || rookPos.x > max_x ) {
                return false;
            }

            if ( rookPos.y < min_y || rookPos.y > max_y ) {
                return false;
            }

            return true;
        }

        if ( ! rookInCourt(r, rookPos, courtWidth) ) {
            console.warn('Out of Bounds. Stop!');
            return false;
        }

        this.rook.radius(r);
    }

    activateRook(event) {
        this.rook.on('dragmove', (e) => { this.constrainRook(this.newRook); });
        this.addRookListeners();
        this.court.draggable(false);
    }

    moveRook(event) {

    }
}
