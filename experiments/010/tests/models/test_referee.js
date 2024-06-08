module('Referee', hooks => {
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
});
