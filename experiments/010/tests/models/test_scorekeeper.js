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
});
