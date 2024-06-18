module('Scorekeeper', hooks => {
    const playerParams = {
        id: 1,
        name: 'alpha',
        email: 'alpha@example.com'
    };

    module('.constructor', hooks => {
        test('when passed a match', assert => {
            let params = { rink: new Rink() };
            let match = new Match(params);
            let scorekeeper = new Scorekeeper(match);

            assert.equal(scorekeeper.match, scorekeeper.match);
            assert.equal(scorekeeper.rink, scorekeeper.rink);
        });

        test('when not passed a match', assert => {
            assert.throws(() => new Scorekeeper(), /TypeError/);
        });
    });

    module('#scoreRound', hooks => {
        test('when passed a valid round', assert => {
            let alphaPlayer = Fixture.player('alpha');
            let betaPlayer = Fixture.player('beta');
            let matchParams = { players: [alphaPlayer, betaPlayer], rink: new Rink() };
            let match = new Match(matchParams);

            let round = new Round({number: 1});

            let alphaMove = new Move({player: alphaPlayer, rook: new Rook({x: 100, y: 100, r: 50})});
            let betaMove = new Move({player: betaPlayer, rook: new Rook({x: 100, y: 100, r: 40})});

            round.addMove(alphaMove);
            round.addMove(betaMove);
            match.addRound(round);

            let scorekeeper = new Scorekeeper(match);
            let scorecard = scorekeeper.scoreRound(round);

            assert.equal(scorecard.moves.length, 2);
            assert.equal(scorecard.scores[betaPlayer], 0);
        });
    });
});
