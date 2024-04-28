class BlowrookAI {
    constructor() {
        this.ownerId = 'BlowrookAI';
    }

    move(match) {
        console.log('BlowrookAI.move', match);
        let minRadius = 16;
        let maxRadius = Math.round(match.court.outerRadius * 1.5);

        let radius = this.randInt(minRadius, maxRadius);
        let minP = 1 + radius;
        let maxP = (match.court.outerRadius * 2) - radius - 1;

        let minRook = {
            x: this.randInt(minP, maxP),
            y: this.randInt(minP, maxP),
            r: radius
        };

        return new RookMove(minRook, this.ownerId);
    }

    randInt(min, max) {
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
        const minCeiled = Math.ceil(min);
        const maxFloored = Math.floor(max);
        return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
    }
}
