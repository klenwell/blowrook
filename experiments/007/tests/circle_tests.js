let outerCourt = {
    x: 100,
    y: 100,
    r: 100,
    area: 31416
};

let innerCourt = {
    x: 100,
    y: 100,
    r: 33,
    area: 3421
}

let rook = {
    x: 100,
    y: 100,
    r: 33
}


QUnit.module('Circle.intersect', function() {
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
    QUnit.test('when given a circle', function(assert) {
        assert.equal(Math.round(Circle.area(outerCourt)), outerCourt.area);
        assert.equal(Math.round(Circle.area(innerCourt)), innerCourt.area);
    });
});


QUnit.module('Circle loaded', function() {
    QUnit.test('', function(assert) {
        assert.ok(Circle);
    });
});
