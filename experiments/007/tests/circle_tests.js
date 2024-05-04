const { test } = QUnit;
const PRECISION = 0.001;

const outerCourt = { x: 100, y: 100, r: 100 };
const innerCourt = { x: 100, y: 100, r: 33 };
const testRook = { x: 150, y: 150, r: 60 }



QUnit.module('Circle.overlapArea', hooks => {
    test('when rook overlaps outerCourt', assert => {
        const expectedResult = 8399.684;
        assert.close(Circle.overlapArea(testRook, outerCourt), expectedResult, PRECISION);
        assert.close(Circle.overlapArea(outerCourt, testRook), expectedResult, PRECISION);
    });

    test('when rook overlaps innerCourt', assert => {
        const expectedResult = 866.212;
        assert.close(Circle.overlapArea(testRook, innerCourt), expectedResult, PRECISION);
    });

    test('when innerCourt overlaps outerCourt', assert => {
        const expectedResult = Circle.area(innerCourt);
        assert.close(Circle.overlapArea(innerCourt, outerCourt), expectedResult, PRECISION);
    });

    test('when rook does not overlap innerCourt', assert => {
        const rook = { r: 1, x: 0, y: 0 }
        assert.close(Circle.overlapArea(rook, innerCourt), 0, PRECISION);
    });
});


QUnit.module('Circle loaded', hooks => {
    QUnit.test('', function(assert) {
        assert.ok(Circle);
    });
});
