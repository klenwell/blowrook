class BlowrookUI {
    constructor(app) {
        this.app = app;
    }

    init() {
        this.stage = this.initStage(this.app.settings.selector, this.app.court);
        this.layer = new Konva.Layer();
        this.court = this.drawCourt(this.app.court);
        this.rook = null;

        this.stage.add(this.layer);
        this.layer.add(this.court);
        this.layer.draw();
    }

    initStage(selector, court) {
        // https://konvajs.org/docs/overview.html
        return new Konva.Stage({
            container: selector,
            width: court.radius*2,
            height: court.radius*2
        });
    }

    drawCourt(court) {
        let image = new Konva.Group({
            x: 0,
            y: 0,
            draggable: true
        });

        let courtImage = new Konva.Circle({
            x: court.radius,
            y: court.radius,
            radius: court.radius,
            fill: 'white',
            stroke: '#CC0000',
            strokeWidth: 1
        });

        let centerImage = new Konva.Circle({
            x: court.radius,
            y: court.radius,
            radius: court.centerRadius,
            fill: '#CC0000'
        });

        // Enable drag on court but keep the court in place.
        // https://stackoverflow.com/a/40259113/1093087
        image.setAttr('dragBoundFunc', () => {
            var pos = image.getAbsolutePosition();
            return {x: pos.x, y: pos.y};
        });

        image.add(courtImage);
        image.add(centerImage);

        return image;
    }

    /*
     * Events
    **/
    placeRook(event) {
        if ( this.rook ) {
            console.log('rook has been placed')
            this.court.draggable('false');
            return;
        }

        var pointerPos = this.stage.getPointerPosition();
        console.log('Create new rook at point', pointerPos);

        this.newRook = new Rook(1, pointerPos.x, pointerPos.y);
        layer.add(this.newRook.image);

        console.log('createRook:', this.newRook);

    }

    moveRook(event) {

    }

    resizeRook(event) {

    }
}
