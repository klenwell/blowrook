class Experiment {
    constructor(selector) {
        this.selector = selector;
    }

    run() {
        console.log('this.selector')
        const svg = d3.select(this.selector)
            .append("svg")
            .attr("width", 400)
            .attr("height", 400)
            .attr('stroke', '#333')
            .attr('fill', '#eee');

        const circle = svg.append('circle')
            .attr('cx', 200)
            .attr('cy', 200)
            .attr('r', 100)
            .attr('stroke', 'black')
            .attr('fill', '#ddd');

        console.log(svg);
        console.log('circle?');
    }
}

const experiment = new Experiment('#canvas');
experiment.run();
