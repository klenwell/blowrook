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

    module('#conflictsWith', hooks => {
        test('when one rook encompasses another', assert => {
            let alphaPlayer = Fixture.player('alpha');
            let betaPlayer = Fixture.player('beta');
            let alphaRook = new Rook({x: 100, y: 100, r: 50});
            let betaRook = new Rook({x: 100, y: 100, r: 10});

            let alphaMove = new Move({player: alphaPlayer, rook: alphaRook});
            let betaMove = new Move({player: betaPlayer, rook: betaRook});

            assert.true(alphaMove.conflictsWith(betaMove));
            assert.true(betaMove.conflictsWith(alphaMove));
        });
    });
});
