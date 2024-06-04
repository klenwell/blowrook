module('Rink', hooks => {
    module('.constructor', hooks => {
        test('when instantiated without params', assert => {
            let rink = new Rink();

            assert.equal(rink.radius, RinkDimensions.R);
            assert.equal(rink.x, RinkDimensions.X);
            assert.equal(rink.y, RinkDimensions.Y);
        });
    });

    module('#containsRook', hooks => {
        test('when rook is in rink', assert => {
            let rink = new Rink();
            let rook = new Rook({x: 100, y: 100, r:20});

            assert.true(rink.containsRook(rook));
        });

        test('when rook is on edge of rink', assert => {
            let rink = new Rink();
            let rook = new Rook({x: 160, y: 100, r:40});

            assert.true(rink.containsRook(rook));
        });

        test('when rook is outside of rink', assert => {
            let rink = new Rink();
            let rook = new Rook({x: 161, y: 100, r:40});

            assert.false(rink.containsRook(rook));
        });

        test('when rook coordinates are negative', assert => {
            let rink = new Rink();
            let rook = new Rook({x: -100, y: -100, r:40});

            assert.false(rink.containsRook(rook));
        });
    });
});
