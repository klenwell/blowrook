document.addEventListener("DOMContentLoaded", function() {
    console.log('document ready');
    const h2Title = document.getElementById('title');
    const titleTag = document.getElementsByTagName('title')[0];
    h2Title.innerText = titleTag.innerText;
})

class Court {
    constructor(selector, width, height) {
        this.selector = selector
        this.width = width;
        this.height = height;
        this.svg = this.initSvg();
    }

    initSvg() {
        return d3.select(this.selector).append("svg")
            .attr("width", this.width)
            .attr("height", this.height)
            .attr('fill', 'white');
    }

    addRook(rook) {
        this.rook = rook;
        this.rook.initSvg(this.svg);
    }
}
