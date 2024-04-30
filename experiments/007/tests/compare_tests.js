// See circle_tests.js for constants


QUnit.module('compare overlap area methods', hooks => {
    const circleJsMethod = (c1, c2) => { return Math.round(Circle.intersectionArea(c1, c2)); }
    const stackMethod = (c1, c2) => { return Math.round(stackExchangeArea(c1, c2)); }
    const p5Method = (c1, c2) => { return Math.round(p5SketchArea(c1, c2)); }
    let rook;

    hooks.beforeEach(() => {
        rook = structuredClone(originalRook);
    });

    QUnit.test('when rook (53,54,100) overlaps outerCourt', function(assert) {
        rook = { r: 53, x: 54, y: 100 };
        let expectedResult = 8825;

        let rookArea = Math.round(Circle.area(rook));

        let circleOuterArea = circleJsMethod(outerCourt, rook);
        let stackOuterArea = stackMethod(outerCourt, rook);
        let p5OuterArea = p5Method(outerCourt, rook);

        assert.equal(rookArea, expectedResult);
        assert.equal(circleOuterArea, expectedResult);
        assert.equal(stackOuterArea, expectedResult);
        assert.equal(p5OuterArea, expectedResult);
    });

    QUnit.test('when rook (53,54,100) overlaps innerCourt', function(assert) {
        rook = { r: 53, x: 54, y: 100 };
        let expectedResult = 1932;

        let circleInnerArea = circleJsMethod(innerCourt, rook);
        let stackInnerArea = stackMethod(innerCourt, rook);
        let p5InnerArea = p5Method(innerCourt, rook);

        assert.equal(circleInnerArea, expectedResult);
        assert.equal(stackInnerArea, expectedResult);
        assert.equal(p5InnerArea, expectedResult);
    });

    QUnit.test('when rook (45, 148, 148) overlaps outerCourt', function(assert) {
        rook = { r: 45, x: 148, y: 148 };
        let expectedRookArea = 6362;
        let expectedResult = 5663;

        let rookArea = Math.round(Circle.area(rook));

        let circleOuterArea = circleJsMethod(outerCourt, rook);
        let stackOuterArea = stackMethod(outerCourt, rook);
        let p5OuterArea = p5Method(outerCourt, rook);

        assert.equal(rookArea, expectedRookArea);
        assert.equal(circleOuterArea, expectedResult);
        assert.equal(stackOuterArea, expectedResult);
        assert.equal(p5OuterArea, expectedResult);
    });

    QUnit.test('when rook (45, 148, 148) overlaps innerCourt', function(assert) {
        rook = { r: 45, x: 148, y: 148 };
        let expectedResult = 259;

        let circleArea = circleJsMethod(innerCourt, rook);
        let stackArea = stackMethod(innerCourt, rook);
        let p5Area = p5Method(innerCourt, rook);

        assert.equal(circleArea, expectedResult);
        assert.equal(stackArea, expectedResult);
        assert.equal(p5Area, expectedResult);
    });

});
