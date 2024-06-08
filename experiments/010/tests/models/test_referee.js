module('Referee', hooks => {
    const playerParams = {
        id: 1,
        name: 'alpha',
        email: 'alpha@example.com'
    };

    module('.constructor', hooks => {
        test('when passed a match with rink', assert => {
            let params = { rink: new Rink() };
            let match = new Match(params);
            let referee = new Referee(match);

            assert.equal(referee.match, match);
            assert.equal(referee.rink, match.rink);
        });

        test('when passed a match without rink', assert => {
            let match = new Match();
            let referee = new Referee(match);

            assert.equal(referee.match, match);
            assert.notOk(referee.rink);
        });

        test('when not passed a match', assert => {
            assert.throws(() => new Referee(), /TypeError/);
        });
    });

    module('#isValidMove', hooks => {
        hooks.beforeEach(() => {
            let params = { rink: new Rink() };
            let match = new Match(params);
            this.referee = new Referee(match);

            this.player = new Player(playerParams);
        });

        hooks.afterEach(() => {
            this.referee = undefined;
            this.player = undefined;
        });

        test('when passed a valid move', assert => {
            let rookParams = this.referee.rink.circle
            let rook = new Rook(rookParams);

            let params = {
                player: this.player,
                rook: rook
            };
            let move = new Move(params);

            assert.ok(this.referee.isValidMove(move));
        });

        test('when passed an invalid move', assert => {
            let rookParams = this.referee.rink.circle
            rookParams.r += 1;
            let rook = new Rook(rookParams);

            let params = {
                player: this.player,
                rook: rook
            };
            let move = new Move(params);

            assert.notOk(this.referee.isValidMove(move));
        });

        test('when passed no move', assert => {
            assert.throws(() => this.referee.isValidMove(), /TypeError/);
        });
    });
});
