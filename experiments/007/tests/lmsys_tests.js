QUnit.module('lmsys methods', hooks => {
    const methodA = (c1, c2) => { return Math.round(circleOverlapAreaChatA(c1, c2)); }
    const methodB = (c1, c2) => { return Math.round(circleOverlapAreaChatB(c1, c2)); }
    const rook = { r: 53, x: 54, y: 100 };

    console.log(rook, Math.round(Circle.area(rook)));

    QUnit.test('when test case A overlaps with outer court', function(assert) {
        let expectedResult = 8825;

        let area = methodA(outerCourt, rook);
        let areaRev = methodA(rook, outerCourt);

        assert.equal(area, expectedResult);
        assert.equal(area, areaRev);
    });

    QUnit.test('when test case B overlaps with outer court', function(assert) {
        let expectedResult = 8825;

        let area = methodB(outerCourt, rook);
        let areaRev = methodB(rook, outerCourt);

        assert.equal(area, expectedResult);
        assert.equal(area, areaRev);
    });

    QUnit.test('when test case A overlaps with inner court', function(assert) {
        let expectedResult = 1932;

        let area = methodA(innerCourt, rook);
        let areaRev = methodA(rook, innerCourt);

        assert.equal(area, expectedResult);
        assert.equal(area, areaRev);
    });

    QUnit.test('when test case B overlaps with inner court', function(assert) {
        let expectedResult = 1932;

        let area = methodB(innerCourt, rook);
        let areaRev = methodB(rook, innerCourt);

        assert.equal(area, expectedResult);
        assert.equal(area, areaRev);
    });

    QUnit.test('CircleJS Case', function(assert) {
        const c1 = { r: 47, x: 153, y: 153 };
        const c2 = { r: 100, x: 100, y: 100 };
        const expectedResult = 5446;

        let areaA = methodA(c1, c2);
        let areaB = methodB(c1, c2);

        assert.equal(areaA, expectedResult);
        assert.equal(areaA, areaB);
    });
});
