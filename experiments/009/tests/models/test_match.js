module('Match', hooks => {
    const rookParams = {
        x: 100,
        y: 100,
        r: 100
    };

    let alphaMoveParams = {
        player: Fixture.player('alpha'),
        rook: new Rook(rookParams)
    };

    let betaMoveParams = {
        player: Fixture.player('beta'),
        rook: new Rook(rookParams)
    };

    module('.constructor', hooks => {
        let alphaMove = new Move(alphaMoveParams);
        let betaMove = new Move(betaMoveParams);
        let params = { players: [alphaMove.player, betaMove.player] };
        let match = new Match(params);

        test('when passed players', assert => {
            assert.equal(match.roundNumber, 0);
            assert.equal(match.players.length, 2);
            assert.notEqual(match.players.indexOf(alphaMove.player), -1, 'contains expected player');
        });
    });
});
