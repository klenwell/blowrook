const outerCourt = {
    x: 100,
    y: 100,
    r: 100,
    area: 31416
};

const innerCourt = {
    x: 100,
    y: 100,
    r: 33,
    area: 3421
}

const originalRook = {
    x: 100,
    y: 100,
    r: 33
}

const DELTA = 0.01


QUnit.module('Fuzz Tests', hooks => {
    const roundedIntersectArea = (c1, c2) => { return Math.round(Circle.intersectionArea(c1, c2)); }
    let rook;

    hooks.beforeEach(() => {
        rook = structuredClone(originalRook);
    });

    QUnit.test('when params are 53, 54, 100', function(assert) {
        rook = { r: 53, x: 54, y: 100 };
        const expectedArea = 8824.73;
        const expectedOuterOverlap = 8824.73;
        const expectedInnerOverlap = 1932.04;

        assert.close(Circle.area(rook), expectedArea, DELTA);
        assert.close(Circle.intersectionArea(outerCourt, rook), expectedOuterOverlap, DELTA);
        assert.close(Circle.intersectionArea(rook, outerCourt), expectedOuterOverlap, DELTA);
        assert.close(Circle.intersectionArea(innerCourt, rook), expectedInnerOverlap, DELTA);
        assert.close(Circle.intersectionArea(rook, innerCourt), expectedInnerOverlap, DELTA);
    });

    QUnit.test('when params are 45, 148, 148', function(assert) {
        rook = { r: 45, x: 148, y: 148 };
        const expectedArea = 6361.73;
        const expectedOuterOverlap = 3299.21;
        const expectedInnerOverlap = 259.01;

        assert.close(Circle.area(rook), expectedArea, DELTA);
        assert.equal(Circle.intersectionArea(outerCourt, rook), Circle.intersectionArea(rook, outerCourt));
        assert.close(Circle.intersectionArea(outerCourt, rook), expectedOuterOverlap, DELTA);
        assert.close(Circle.intersectionArea(rook, outerCourt), expectedOuterOverlap, DELTA);
        assert.close(Circle.intersectionArea(innerCourt, rook), expectedInnerOverlap, DELTA);
        assert.close(Circle.intersectionArea(rook, innerCourt), expectedInnerOverlap, DELTA);
    });
});


QUnit.module('Circle.intersectionArea', hooks => {
    const roundedIntersectArea = (c1, c2) => { return Math.round(Circle.intersectionArea(c1, c2)); }
    let rook;

    hooks.beforeEach(() => {
        rook = structuredClone(originalRook);
    });

    QUnit.test('when circles intersect', function(assert) {
        assert.equal(Circle.intersectionArea(outerCourt, innerCourt), Circle.area(innerCourt));
        assert.equal(Circle.intersectionArea(outerCourt, rook), Circle.area(rook));
        assert.equal(Circle.intersectionArea(innerCourt, rook), Circle.area(innerCourt));
    });

    QUnit.test('when circles do not intersect', function(assert) {
        rook.x = 0;
        assert.equal(Circle.intersectionArea(innerCourt, rook), 0);
    });

    QUnit.test('when circles touch', function(assert) {
        rook.x = innerCourt.x + rook.r + innerCourt.r;
        assert.equal(Circle.intersectionArea(innerCourt, rook), 0);
    });

    QUnit.test('when circles overlap', function(assert) {
        rook.x = innerCourt.x - rook.r;
        assert.true(Circle.intersectionArea(innerCourt, rook) < innerCourt.area / 2);
        assert.equal(roundedIntersectArea(innerCourt, rook), 1338);

        rook.x = innerCourt.x - 10;
        assert.true(Circle.intersectionArea(innerCourt, rook) > innerCourt.area * .75);
        assert.true(roundedIntersectArea(innerCourt, rook) < innerCourt.area);
        assert.equal(roundedIntersectArea(innerCourt, rook), 2764);
    });

    QUnit.test('when argument order is reversed', function(assert) {
        rook.x = innerCourt.x - rook.r;
        assert.equal(roundedIntersectArea(innerCourt, rook), 1338);
        assert.equal(roundedIntersectArea(rook, innerCourt), 1338);

        rook.x = innerCourt.x - 10;
        assert.equal(roundedIntersectArea(innerCourt, rook), 2764);
        assert.equal(roundedIntersectArea(rook, innerCourt), 2764);
    });

    QUnit.test('when equal circles almost completely overlap', function(assert) {
        // Offset axes
        let expectedArea = 3355;
        assert.true(expectedArea < innerCourt.area);

        rook.x = innerCourt.x - 1;
        assert.equal(roundedIntersectArea(innerCourt, rook), expectedArea);

        rook.x = innerCourt.x + 1;
        assert.equal(roundedIntersectArea(innerCourt, rook), expectedArea);

        rook.x = innerCourt.x;
        rook.y = innerCourt.y - 1;
        assert.equal(roundedIntersectArea(innerCourt, rook), expectedArea);

        rook.y = innerCourt.x + 1;
        assert.equal(roundedIntersectArea(innerCourt, rook), expectedArea);

        // Offset corners
        expectedArea = 3328;
        assert.true(expectedArea < innerCourt.area);

        rook.x = innerCourt.x - 1;
        rook.y = innerCourt.y - 1;
        assert.equal(roundedIntersectArea(innerCourt, rook), expectedArea);

        rook.x = innerCourt.x + 1;
        rook.y = innerCourt.y - 1;
        assert.equal(roundedIntersectArea(innerCourt, rook), expectedArea);

        rook.x = innerCourt.x + 1;
        rook.y = innerCourt.y + 1;
        assert.equal(roundedIntersectArea(innerCourt, rook), expectedArea);

        rook.x = innerCourt.x - 1;
        rook.y = innerCourt.y + 1;
        assert.equal(roundedIntersectArea(innerCourt, rook), expectedArea);
    });
});


QUnit.module('Circle.intersect', function() {
    let rook = structuredClone(originalRook);

    QUnit.test('when circles intersect', function(assert) {
        assert.true(Circle.intersect(outerCourt, innerCourt));
        assert.true(Circle.intersect(outerCourt, rook));
        assert.true(Circle.intersect(innerCourt, rook));
    });

    QUnit.test('when circles do not intersect', function(assert) {
        rook.x = 0;
        assert.false(Circle.intersect(rook, innerCourt));
    });

    QUnit.test('when circles touch', function(assert) {
        rook.x = innerCourt.x + rook.r + innerCourt.r;
        assert.true(Circle.intersect(rook, innerCourt));

        rook.x = rook.x + .001;
        assert.false(Circle.intersect(rook, innerCourt));
    });
});


QUnit.module('Circle.area', function() {
    let rook = structuredClone(originalRook);

    QUnit.test('when given a circle', function(assert) {
        assert.equal(Math.round(Circle.area(outerCourt)), outerCourt.area);
        assert.equal(Math.round(Circle.area(innerCourt)), innerCourt.area);
        assert.equal(Circle.area(innerCourt), Circle.area(rook));
    });
});


QUnit.module('Circle loaded', function() {
    QUnit.test('', function(assert) {
        assert.ok(Circle);
    });
});
