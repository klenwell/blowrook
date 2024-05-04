const { test } = QUnit;
const PRECISION = 0.001;

/**
 * Control implementation
 * Source: https://math.stackexchange.com/a/290526
 */
function controlOverlapArea(circle1, circle2) {
    const x0 = circle1.x, y0 = circle1.y, r0 = circle1.r;
    const x1 = circle2.x, y1 = circle2.y, r1 = circle2.r;

    const rr0 = r0*r0;
    const rr1 = r1*r1;
    const c = Math.sqrt((x1-x0)*(x1-x0) + (y1-y0)*(y1-y0));
    const phi = (Math.acos((rr0+(c*c)-rr1) / (2*r0*c)))*2;
    const theta = (Math.acos((rr1+(c*c)-rr0) / (2*r1*c)))*2;
    const area1 = 0.5*theta*rr1 - 0.5*rr1*Math.sin(theta);
    const area2 = 0.5*phi*rr0 - 0.5*rr0*Math.sin(phi);
    return area1 + area2;
}

QUnit.module('Circle.intersectionArea', hooks => {

    const c1 = { r: 47, x: 153, y: 153 };
    const c2 = { r: 100, x: 100, y: 100 };
    const expectedArea = 5446.476;

    test('control implementation', assert => {
        assert.close(controlOverlapArea(c1, c2), expectedArea, PRECISION);
    });

    test('Circle.intersectionArea', assert => {
        assert.close(Circle.intersectionArea(c1, c2), expectedArea, PRECISION);
    });

    test('when reversing argument order for control implementation', assert => {
        assert.close(controlOverlapArea(c1, c2), controlOverlapArea(c2, c1), PRECISION);
    });

    test('when reversing argument order for Circle.intersectionArea', assert => {
        assert.close(Circle.intersectionArea(c1, c2), Circle.intersectionArea(c2, c1), PRECISION);
    });

    test('Circle.intersectionArea matches control implementation', assert => {
        assert.close(Circle.intersectionArea(c1, c2), controlOverlapArea(c1, c2), PRECISION);
    });
});
