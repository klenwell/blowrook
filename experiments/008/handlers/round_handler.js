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
                    if ( roundData.complete ) {
                        handler.round.process(roundData);
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
            handler.match.addRound(handler.round);
            handler.view.updateScoreboardRound(handler.round);
            handler.view.updateScoreboardTotal(handler.match);
            handler.controller.changeState('nextRound')
        }
    }
}


class RoundHandler {
    constructor(matchController) {
        this.controller = matchController;
        this.round = new Round(this.match.roundNumber);
        this.initStates(RoundStates);
    }

    get view() {
        return this.controller.view;
    }

    get match() {
        return this.controller.match;
    }

    get moveButton() {
        return $('button#post-move');
    }

    enableUserMove() {
        console.warn('enableUserMove', this);
        let handler = this;

        this.moveButton.on('click', (e) => {
            let params = {
                user: handler.match.user,
                event: e
            }
            console.log('user makes move', params);
            handler.postMove(params);
        });

        this.view.gameboardEl.show();
    }

    disableUserMove() {
        console.warn('disableUserMove', this);
        this.moveButton.off('click');
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
            this.changeState('move');
        }
    }

    getRoundState(params) {
        // Get state of round: have both user taken turn? If so, process round. If not, pause and try again.
        let roundState = {
            'user_move': this.round.userMove,
            'opponent_move': null,
            'complete': false
        };

        let opponentMove = new Move(this.match.opponent);
        let opponentReady = opponentMove.isValid();

        if ( opponentReady ) {
            console.log(opponentMove);
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
