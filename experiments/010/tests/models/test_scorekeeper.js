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

    module('#scoreMove', hooks => {
        test('when move is active', assert => {
            let player = Fixture.player('player');
            let move = new Move({player: player, rook: new Rook({x: 100, y: 100, r: 10})});
            let match = new Match({ players: [], rink: new Rink() });
            let scorekeeper = new Scorekeeper(match);
            const score = scorekeeper.scoreMove(move);

            assert.true(move.isActive());
            assert.equal(score, 9);
        });

        test('when move is inactive', assert => {
            let player = Fixture.player('player');
            let move = new Move({player: player, rook: new Rook({x: 100, y: 100, r: 10})});
            let match = new Match({ players: [], rink: new Rink() });
            let scorekeeper = new Scorekeeper(match);

            move.deactivate();
            const score = scorekeeper.scoreMove(move);

            assert.false(move.isActive());
            assert.equal(score, 0);
        });

        test('when move rook is as big as rink', assert => {
            let player = Fixture.player('player');
            let match = new Match({ players: [], rink: new Rink() });
            let rook = new Rook(match.rink.circle);
            let move = new Move({player: player, rook: rook});
            let scorekeeper = new Scorekeeper(match);
            const score = scorekeeper.scoreMove(move);

            assert.true(move.isActive());
            assert.equal(score, 383);
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
            let betaMove = new Move({player: betaPlayer, rook: new Rook({x: 100, y: 100, r: 10})});

            round.addMove(alphaMove);
            round.addMove(betaMove);
            match.addRound(round);

            let scorekeeper = new Scorekeeper(match);
            let scorecard = scorekeeper.scoreRound(round);

            assert.equal(scorecard.moves.length, 2);
            assert.equal(scorecard.scores[alphaPlayer.id], 0);
            assert.equal(scorecard.scores[betaPlayer.id], 9);
        });
    });
});
