const RoundStates = {
    move: {
        enter: (controller) => {
            controller.enableUserMove();
        },

        exit: (controller) => {
            controller.disableUserMove();
        }
    },

    wait: {
        enter: (controller) => {
            let request = controller.getRoundState();

            request
                .done(() => {
                    round.process(roundData);

                    if ( round.isComplete() ) {
                        controller.changeState('process');
                    }
                    else {
                        const retryInterval = 500;
                        setTimeout(() => { controller.changeState('wait'); }, retryInterval);
                    }
                });
        }
    },

    process: {}
}


class RoundHandler {
    constructor(matchController) {
        this.controller = matchController;
        this.view = matchController.view;
        this.round = new Round();
        this.initStates(RoundStates);
    }

    enableUserMove() {
        let moveButton = $('button#post-move');
        let handler = this;

        moveButton.on('click', (e) => {
            console.log('user makes move');
            handler.postMove(e);
        });

        this.view.gameboardEl.show();
    }

    disableUserMove() {
        let moveButton = $('button#post-move');
        moveButton.off('click');
        this.view.gameboardEl.hide();
    }

    postMove(params) {
        let userMove = new UserMove(params);

        if ( userMove.isValid() ) {
            this.round.userMove = userMove;
            this.changeState('wait');
        }
        else {
            alert('Invalid move. Try again.');
        }
        this.round.userMove = params;

    }

    getRoundState(params) {
        // Get state of round: have both user taken turn? If so, process round. If not, pause and try again.
        console.log('getRoundState', params, this.round);

        // post params
        let request = $.Deferred();
        setTimeout(() => { request.resolve({ complete: false }); }, 400);
        return request;
    }
}

Object.assign(RoundHandler.prototype, MinStateMachineMixin);
