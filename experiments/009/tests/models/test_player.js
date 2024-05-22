const { module, test } = QUnit;

const playerParams = {
    id: 1,
    name: 'klenwell',
    email: 'klenwell@example.com'
};


module('Player', hooks => {
    module('.constructor', hooks => {
        test('when passed complete params', assert => {
            let player = new Player(playerParams);

            assert.equal(player.id, playerParams.id);
            assert.equal(player.name, playerParams.name);
            assert.equal(player.email, playerParams.email);
        });

        test('when param order varies', assert => {
            let params = {
                name: playerParams.name,
                email: playerParams.email,
                id: playerParams.id
            };
            let player = new Player(params);

            assert.equal(player.id, playerParams.id);
            assert.equal(player.name, playerParams.name);
            assert.equal(player.email, playerParams.email);
        });

        test('when not passed email param', assert => {
            let params = {
                id: playerParams.id,
                name: playerParams.name
            }
            let player = new Player(params);

            assert.equal(player.id, playerParams.id);
            assert.equal(player.name, playerParams.name);
            assert.equal(player.email, undefined);
        });

    });
});
