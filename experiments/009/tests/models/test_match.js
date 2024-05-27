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
            assert.ok(match, 'match instantiated')
            assert.equal(match.players.length, 2, 'with 2 players');
            assert.notEqual(match.players.indexOf(alphaMove.player), -1, 'contains expected player');
        });
    });

    module('#roundNumber', hooks => {
        let alphaMove = new Move(alphaMoveParams);
        let betaMove = new Move(betaMoveParams);
        let params = { players: [alphaMove.player, betaMove.player] };
        let match = new Match(params);

        test('when match starts', assert => {
            assert.equal(match.roundNumber, 0);
        });

        test('when round is added', assert => {
            let round = new Round({number: 1});
            match.addRound(round);

            assert.equal(match.roundNumber, 1);
        });
    });

    module('#scores', hooks => {
        let alphaMove = new Move(alphaMoveParams);
        let betaMove = new Move(betaMoveParams);
        let alphaPlayer = alphaMove.player;
        let betaPlayer = betaMove.player;
        let params = { players: [alphaPlayer, betaPlayer] };
        let match;

        hooks.beforeEach(() => {
            match = new Match(params);
        });

        hooks.afterEach(() => {
            match = undefined;
        });

        test('with no rounds', assert => {
            assert.equal(match.scores[alphaPlayer.id], 0);
            assert.equal(match.scores[betaPlayer.id], 0);
        });

        test('with two rounds', assert => {
            // Round 1
            let alphaMove1 = new Move({
                player: alphaPlayer,
                rook: new Rook(rookParams),
                score: 0
            });
            let betaMove1 = new Move({
                player: betaPlayer,
                rook: new Rook(rookParams),
                score: 20
            });
            let round1 = new Round({number: 1});
            round1.addMove(alphaMove1);
            round1.addMove(betaMove1);

            // Round 2
            let alphaMove2 = new Move({
                player: alphaPlayer,
                rook: new Rook(rookParams),
                score: 50
            });
            let betaMove2 = new Move({
                player: betaPlayer,
                rook: new Rook(rookParams),
                score: 20
            });
            let round2 = new Round({number: 2});
            round2.addMove(alphaMove2);
            round2.addMove(betaMove2);

            match.addRound(round1);
            match.addRound(round2);

            assert.equal(match.scores[alphaPlayer.id], 50);
            assert.equal(match.scores[betaPlayer.id], 40);
        });
    });
});
