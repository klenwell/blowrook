class Experiment {
    constructor(selector) {
        console.log(selector)
        this.svg = d3.select(selector).append("svg");
        this.circle = this.svg.append('circle');
    }

    run() {
        this.svg
            .attr("width", 400)
            .attr("height", 400)
            .attr('stroke', '#333')
            .attr('fill', '#eee');

        this.circle
            .attr('cx', 200)
            .attr('cy', 200)
            .attr('r', 100)
            .attr('stroke', 'darkblue')
            .attr('fill', 'steelblue');

        console.log(this.svg);

        this.enableDrag();
    }



    enableDrag() {
        function dragStarted(event) {
            console.log(this);
            d3.select(this).raise().classed("active", true);
        }
        function dragged(event) {
            d3.select(this).attr("cx", event.x).attr("cy", event.y);
        }
        function dragEnded(event) {
            d3.select(this).classed("active", false);
        }

        const drag = d3.drag()
            .on("start", dragStarted)
            .on("drag", dragged)
            .on("end", dragEnded);

        this.circle.call(drag);
    }
}

const experiment = new Experiment('#canvas');
experiment.run();
