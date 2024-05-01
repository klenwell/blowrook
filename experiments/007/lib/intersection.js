function circleOverlaps(circle1, circle2) {
    const { x: x1, y: y1, r: r1 } = circle1;
    const { x: x2, y: y2, r: r2 } = circle2;
    const d = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    return d < r1 + r2
}


function circleContainsCircle(circle1, circle2) {
    const { x: x1, y: y1, r: r1 } = circle1;
    const { x: x2, y: y2, r: r2 } = circle2;
    const d = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    return d <= Math.abs(r1 - r2)
}


/*
 * https://math.stackexchange.com/a/290526
**/
function stackOverlapArea(circle1, circle2) {
    const x0 = circle1.x, y0 = circle1.y, r0 = circle1.r;
    const x1 = circle2.x, y1 = circle2.y, r1 = circle2.r;

    if ( ! circleOverlaps(circle1, circle2) ) {
        return 0;
    }

    if ( ! circleContainsCircle(circle1, circle2) ) {
        const rMin = Math.min(r0, r1);
        return Math.PI * rMin * rMin; // Area of the smaller circle
    }

    const rr0 = r0*r0;
    const rr1 = r1*r1;
    const c = Math.sqrt((x1-x0)*(x1-x0) + (y1-y0)*(y1-y0));
    const phi = (Math.acos((rr0+(c*c)-rr1) / (2*r0*c)))*2;
    const theta = (Math.acos((rr1+(c*c)-rr0) / (2*r1*c)))*2;
    const area1 = 0.5*theta*rr1 - 0.5*rr1*Math.sin(theta);
    const area2 = 0.5*phi*rr0 - 0.5*rr0*Math.sin(phi);
    return area1 + area2;
}


/**
 * Source https://chat.lmsys.org/
 *
 */
function circleOverlapAreaChatA(circle1, circle2) {
    const x0 = circle1.x, y0 = circle1.y, r0 = circle1.r;
    const x1 = circle2.x, y1 = circle2.y, r1 = circle2.r;

    // Calculate the distance between the centers of the two circles
    const d = Math.sqrt((x1 - x0) ** 2 + (y1 - y0) ** 2);

    // Check if the circles overlap
    if (d >= (r0 + r1)) {
        // No overlap
        return 0;
    }
    if (d <= Math.abs(r0 - r1) && r0 >= r1) {
        // Circle2 is completely inside Circle1
        return Math.PI * r1 * r1;
    }
    if (d <= Math.abs(r0 - r1) && r0 < r1) {
        // Circle1 is completely inside Circle2
        return Math.PI * r0 * r0;
    }

    // Calculate the overlap area
    const r0Sq = r0 * r0;
    const r1Sq = r1 * r1;

    const cosTheta0 = (r0Sq + d * d - r1Sq) / (2 * r0 * d);
    const cosTheta1 = (r1Sq + d * d - r0Sq) / (2 * r1 * d);

    const theta0 = Math.acos(cosTheta0) * 2;
    const theta1 = Math.acos(cosTheta1) * 2;

    const area0 = 0.5 * theta0 * r0Sq - 0.5 * r0Sq * Math.sin(theta0);
    const area1 = 0.5 * theta1 * r1Sq - 0.5 * r1Sq * Math.sin(theta1);

    return area0 + area1;
}

/**
 * Source https://chat.lmsys.org/
 */
function circleOverlapAreaChatB(circle1, circle2) {
    const { x: x1, y: y1, r: r1 } = circle1;
    const { x: x2, y: y2, r: r2 } = circle2;

    // Distance between the centers
    const d = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

    // Check if circles are separate
    if (d >= r1 + r2) {
        return 0;
    }

    // Check if one circle is within the other
    if (d <= Math.abs(r1 - r2)) {
        const rMin = Math.min(r1, r2);
        return Math.PI * rMin * rMin; // Area of the smaller circle
    }

    // Calculate overlap area
    const r1Sq = r1 * r1;
    const r2Sq = r2 * r2;
    const cos1 = (d * d + r1Sq - r2Sq) / (2 * d * r1);
    const cos2 = (d * d + r2Sq - r1Sq) / (2 * d * r2);
    const term1 = r1Sq * Math.acos(cos1);
    const term2 = r2Sq * Math.acos(cos2);
    const term3 = 0.5 * Math.sqrt((-d + r1 + r2) * (d + r1 - r2) * (d - r1 + r2) * (d + r1 + r2));

    const overlapArea = term1 + term2 - term3;
    return overlapArea;
}
