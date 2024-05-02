class Circle {
    static area(circle) {
        return Math.PI * circle.r * circle.r;
    }

    static overlapsCircle(circle1, circle2) {
        const { x: x1, y: y1, r: r1 } = circle1;
        const { x: x2, y: y2, r: r2 } = circle2;
        const d = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
        return d < r1 + r2
    }

    static containsCircle(circle1, circle2) {
        const { x: x1, y: y1, r: r1 } = circle1;
        const { x: x2, y: y2, r: r2 } = circle2;
        const d = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
        return d <= Math.abs(r1 - r2)
    }

    static overlapArea(circle1, circle2) {
        const { x: x1, y: y1, r: r1 } = circle1;
        const { x: x2, y: y2, r: r2 } = circle2;

        if ( ! Circle.overlapsCircle(circle1, circle2) ) {
            return 0;
        }

        if ( Circle.containsCircle(circle1, circle2) ) {
            const rMin = Math.min(r1, r2);
            return Circle.area({r: rMin});
        }

        // Calculate the distance between the centers of the two circles
        const d = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

        // Calculate the overlap area
        const r1Sq = r1 * r1;
        const r2Sq = r2 * r2;

        const cosTheta1 = (r1Sq + d * d - r2Sq) / (2 * r1 * d);
        const cosTheta2 = (r2Sq + d * d - r1Sq) / (2 * r2 * d);

        const theta1 = Math.acos(cosTheta1) * 2;
        const theta2 = Math.acos(cosTheta2) * 2;

        const area1 = 0.5 * theta1 * r1Sq - 0.5 * r1Sq * Math.sin(theta1);
        const area2 = 0.5 * theta2 * r2Sq - 0.5 * r2Sq * Math.sin(theta2);

        return area1 + area2;
    }

    static paramsToCircle(r, x, y) {
        return {
            r: r,
            x: x,
            y: y
        }
    }
}
