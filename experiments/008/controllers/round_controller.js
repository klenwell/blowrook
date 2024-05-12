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
            controller.postRoundState();
        }
    },

    process: {}
}


class RoundController {
    constructor(matchController) {
        this.matchController = matchController;
        this.view = matchController.view;
        this.round = new Round();
        this.initStates(RoundStates);
    }

    enableUserMove() {
        this.view.gameboardEl.show();
    }

    disableUserMove() {
        this.view.gameboardEl.hide();
    }

    postMove(params) {
        this.round.userMove = params;
        this.changeState('wait');
    }

    postRoundState(params) {
        // post params
        let request = $.Deferred();
        let ctrl = this;
        let round = this.round;

        request
            .done((roundData) => {
                round.process(roundData);

                if ( round.isComplete() ) {
                    ctrl.changeState('process');
                }
                else {
                    ctrl.changeState('wait');
                }
            });

        setTimeout(() => { request.resolve({ complete: false }); }, 750);
    }
}

Object.assign(RoundController.prototype, MinStateMachineMixin);
