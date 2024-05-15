const RoundStates = {
    move: {
        enter: (handler) => {
            handler.enableUserMove();
        },

        exit: (handler) => {
            handler.disableUserMove();
        }
    },

    wait: {
        enter: (handler) => {
            let request = handler.getRoundState({});

            request
                .done((roundData) => {
                    handler.round.process(roundData);

                    if ( handler.round.isComplete() ) {
                        handler.changeState('complete');
                    }
                    else {
                        const retryInterval = 500;
                        setTimeout(() => { handler.changeState('wait'); }, retryInterval);
                    }
                });
        }
    },

    complete: {
        enter: (handler) => {
            throw 'update scoreboard';
        }
    }
}


class RoundHandler {
    constructor(matchController) {
        this.controller = matchController;
        this.view = matchController.view;
        this.round = new Round(matchController.match.roundNumber);
        this.initStates(RoundStates);
    }

    enableUserMove() {
        let moveButton = $('button#post-move');
        let handler = this;

        moveButton.on('click', (e) => {
            console.log('user makes move');
            let params = {
                user: handler.controller.match.user,
                event: e
            }
            handler.postMove(params);
        });

        this.view.gameboardEl.show();
    }

    disableUserMove() {
        let moveButton = $('button#post-move');
        moveButton.off('click');
        this.view.gameboardEl.hide();
    }

    postMove(params) {
        let move = new Move(params.user);

        if ( move.isValid() ) {
            this.round.userMove = move;
            this.changeState('wait');
        }
        else {
            alert('Invalid move. Try again.');
        }
    }

    getRoundState(params) {
        // Get state of round: have both user taken turn? If so, process round. If not, pause and try again.
        let roundState = {
            'user_move': this.round.userMove,
            'opponent_move': null,
            'complete': false
        };

        let opponentMove = new Move(this.controller.match.opponent);
        let opponentReady = opponentMove.isValid();

        if ( opponentReady ) {
            roundState.opponent_move = opponentMove;
            roundState.complete = true;
        }

        console.log('getRoundState', params, roundState);

        let request = $.Deferred();
        setTimeout(() => { request.resolve(roundState); }, 400);
        return request;
    }
}

Object.assign(RoundHandler.prototype, MinStateMachineMixin);
