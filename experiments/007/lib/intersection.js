/*
 * https://math.stackexchange.com/a/290526
**/
function stackExchangeArea(c1, c2) {
    // Not overlapping
    var d = Math.hypot(c2['x'] - c1['x'], c2['y'] - c1['y']);
    if (d > c1['r'] + c2['r']) {
        return 0;
    }

    // Totally overlapping
    if (d <= Math.abs(c2['r'] - c1['r'])) {
        var r1 = c1['r'] * c1['r'];
        var r2 = c2['r'] * c2['r'];
        return Math.PI * Math.min(r1, r2);
    }

    // https://math.stackexchange.com/a/290526
    var x0 = c1.x;
    var y0 = c1.y;
    var r0 = c1.r;
    var x1 = c2.x;
    var y1 = c2.y;
    var r1 = c2.r;

    var rr0 = r0*r0;
    var rr1 = r1*r1;
    var c = Math.sqrt((x1-x0)*(x1-x0) + (y1-y0)*(y1-y0));
    var phi = (Math.acos((rr0+(c*c)-rr1) / (2*r0*c)))*2;
    var theta = (Math.acos((rr1+(c*c)-rr0) / (2*r1*c)))*2;
    var area1 = 0.5*theta*rr1 - 0.5*rr1*Math.sin(theta);
    var area2 = 0.5*phi*rr0 - 0.5*rr0*Math.sin(phi);
    return area1 + area2;
}


/*
 * https://editor.p5js.org/Lathryx/sketches/y2PRqXmBf
**/
function p5SketchArea(c1, c2) {
    const sqrt = Math.sqrt;
    const pow = Math.pow;
    const sin = Math.sin;
    const atan = Math.atan;

    // Not overlapping
    var d = Math.hypot(c2['x'] - c1['x'], c2['y'] - c1['y']);


    // Totally overlapping
    if (d <= Math.abs(c2['r'] - c1['r'])) {
        var r1 = c1['r'] * c1['r'];
        var r2 = c2['r'] * c2['r'];
        return Math.PI * Math.min(r1, r2);
    }

    let distance = sqrt(pow(c2.x-c1.x, 2) + pow(c2.y-c1.y, 2));

    if (distance > c1.r + c2.r) {
        return 0;
    }

    if (distance <= Math.abs(c2.r - c1.r)) {
        var r1 = c1.r * c1.r;
        var r2 = c2.r * c2.r;
        return Math.PI * Math.min(r1, r2);
    }

    let a = (pow(c2.r, 2) - pow(c1.r, 2) + pow(distance, 2))/(2*distance);
    let a_edge = a+c2.r;
    let b = (pow(c1.r, 2) - pow(c2.r, 2) + pow(distance, 2))/(2*distance);
    let b_edge = b+c1.r;

    let h = sqrt(pow(c2.r, 2) - pow(a, 2));
    let a1 = 2 * atan(h/a_edge);
    let a2 = 2 * atan(h/b_edge);

    let segment1 = 0.5*pow(c2.r, 2)*(a1-sin(a1));
    let segment2 = 0.5*pow(c1.r, 2)*(a2*2+sin(a2));

    return segment1+segment2;
}
