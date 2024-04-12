class Rook {
    constructor(r, x, y) {
        this.r = r;
        this.x = x;
        this.y = y;
    }

    get pt() {
        return [this.x, this.y];
    }

    get d3Pt() {
        return [this.x, this.y];
    }

    initSvg(courtSvg) {
        this.d3Circle = courtSvg.append('circle')
            .attr('cx', this.x)
            .attr('cy', this.y)
            .attr('r', this.r)
            .attr('fill', 'red');

        this.makeDraggable();
    }

    makeDraggable() {
        const rook = this;
        const drag = d3.drag()
            .on("start", (event) => { rook.onDragStart(event) } )
            .on("drag", this.onDrag)
            .on("end", (event) => { rook.onDragEnd(event) } );

        this.d3Circle.call(drag);
    }

    onDragStart(event) {
        console.log('drag started', this, event)
    }

    onDrag(event) {
        d3.select(this).attr("cx", event.x).attr("cy", event.y);
    }

    onDragEnd(event) {
        this.x = event.x;
        this.y = event.y;
        console.log('drag ended', this.pt)
    }
}
