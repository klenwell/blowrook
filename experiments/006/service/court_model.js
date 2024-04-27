const CourtSettings = {
    outerRadius: 100,
    innerRadius: 33
};

class CourtModel {
    constructor() {
        this.outerRadius = CourtSettings.outerRadius;
        this.innerRadius = CourtSettings.innerRadius;
    }

    get outerCircle() {
        return {
            x: this.outerRadius,
            y: this.outerRadius,
            r: this.outerRadius
        }
    }

    get innerCircle() {
        return {
            x: this.innerRadius,
            y: this.innerRadius,
            r: this.innerRadius
        }
    }

}
