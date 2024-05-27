module('Rook', hooks => {
    const rookParams = {
        x: 100,
        y: 100,
        r: 100
    };

    module('.constructor', hooks => {
        test('when passed complete params', assert => {
            let rook = new Rook(rookParams);

            assert.equal(rook.radius, rookParams.r);
            assert.equal(rook.x, rookParams.x);
            assert.equal(rook.y, rookParams.y);
        });
    });
});
