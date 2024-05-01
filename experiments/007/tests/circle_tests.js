const outerCourt = {
    x: 100,
    y: 100,
    r: 100
};

const innerCourt = {
    x: 100,
    y: 100,
    r: 33
}

const testRook = {
    x: 150,
    y: 150,
    r: 60
}

const PRECISION = 0.001


QUnit.module('When rook overlaps outer court', function() {
    const expectedResult = 8399.684;
    console.log(Circle.area(testRook));

    QUnit.test('stackOverlapArea', function(assert) {
        assert.close(stackOverlapArea(testRook, outerCourt), expectedResult, PRECISION);
    });

    QUnit.test('circleOverlapAreaChatA', function(assert) {
        assert.close(circleOverlapAreaChatA(testRook, outerCourt), expectedResult, PRECISION);
    });

    QUnit.test('circleOverlapAreaChatB', function(assert) {
        assert.close(circleOverlapAreaChatB(testRook, outerCourt), expectedResult, PRECISION);
    });

    QUnit.test('Circle.intersectionArea', function(assert) {
        assert.close(Circle.intersectionArea(testRook, outerCourt), expectedResult, PRECISION);
    });

    QUnit.test('methods match', function(assert) {
        assert.close(stackOverlapArea(testRook, outerCourt), circleOverlapAreaChatA(testRook, outerCourt), PRECISION);
        assert.close(circleOverlapAreaChatA(testRook, outerCourt), circleOverlapAreaChatB(testRook, outerCourt), PRECISION);
    });
});


QUnit.module('Circle loaded', function() {
    QUnit.test('', function(assert) {
        assert.ok(Circle);
    });
});
