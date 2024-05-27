module('Move', hooks => {
    let player, rook;

    const playerParams = {
        id: 1,
        name: 'alpha',
        email: 'alpha@example.com'
    };

    const rookParams = {
        x: 100,
        y: 100,
        r: 100
    };

    hooks.beforeEach(() => {
        player = new Player(playerParams);
        rook = new Rook(rookParams);
    });

    hooks.afterEach(() => {
        player = undefined;
        rook = undefined;
    });

    module('.constructor', hooks => {
        test('when passed complete params', assert => {
            let params = {
                player: player,
                rook: rook
            };
            let move = new Move(params);

            assert.equal(move.player.email, playerParams.email);
            assert.equal(move.rook.radius, rookParams.r);
        });
    });
});
