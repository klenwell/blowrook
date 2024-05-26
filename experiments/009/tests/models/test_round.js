module('Round', hooks => {
    let alphaMove, betaMove;

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

    hooks.beforeEach(() => {
        alphaMove = new Move(alphaMoveParams);
        betaMove = new Move(betaMoveParams);
    });

    hooks.afterEach(() => {
        alphaMove = undefined;
        betaMove = undefined;
    });

    module('.constructor', hooks => {
        let params = { number: 1 };
        let round = new Round(params);

        test('when passed round number', assert => {
            assert.equal(round.number, params.number);
            assert.equal(round.moves.length, 0);
        });
    });

    module('#addMoves', hooks => {
        const params = { number: 1 };
        let round;

        hooks.beforeEach(() => {
            round = new Round(params);
        });

        hooks.afterEach(() => {
            round = undefined;
        });

        test('when one move is added', assert => {
            round.addMove(alphaMove);
            assert.equal(round.moves.length, 1);
        });

        test('when two moves are added', assert => {
            round.addMove(alphaMove);
            round.addMove(betaMove);
            assert.equal(round.moves.length, 2);
        });
    });

    module('#scores', hooks => {
        const params = { number: 1 };
        let round;

        hooks.beforeEach(() => {
            alphaMove = new Move(alphaMoveParams);
            betaMove = new Move(betaMoveParams);
            round = new Round(params);
        });

        hooks.afterEach(() => {
            alphaMove = undefined;
            betaMove = undefined;
            round = undefined;
        });

        test('when moves are not scored', assert => {
            round.addMove(alphaMove);
            round.addMove(betaMove);

            assert.equal(round.scores[alphaMove.player.id], 0);
            assert.equal(round.scores[betaMove.player.id], 0);
        });

        test('when moves are scored', assert => {
            alphaMove.score = 25;
            betaMove.score = 20;
            round.addMove(alphaMove);
            round.addMove(betaMove);

            assert.equal(round.scores[alphaMove.player.id], alphaMove.score);
            assert.equal(round.scores[betaMove.player.id], betaMove.score);
        });

        test('when users make more than one move', assert => {
            alphaMove.score = 25;
            betaMove.score = 20;
            round.addMove(alphaMove);
            round.addMove(alphaMove);
            round.addMove(betaMove);
            round.addMove(betaMove);

            assert.equal(round.scores[alphaMove.player.id], alphaMove.score * 2);
            assert.equal(round.scores[betaMove.player.id], betaMove.score * 2);
            assert.equal(round.moves.length, 4);
            assert.equal(round.movesByPlayer(alphaMove.player).length, 2);
        });
    });
});
