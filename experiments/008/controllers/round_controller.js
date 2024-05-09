const RoundStates = {
    move: {
        enter: (controller) => {
            controller.view.enablePlacement();
        }
    },

    wait: {},

    process: {}
}


class RoundController {
    constructor(matchController) {
        this.matchController = matchController;
        this.view = matchController.view;
        this.round = new Round();
        this.initStates(RoundStates);
    }

    postMove(params) {
        // post params
        let request = $.Deferred();
        let ctrl = this;
        let round = this.round;

        request
            .success((roundData) => {
                round.process(roundData);

                if ( round.isComplete() ) {
                    ctrl.changeState('process');
                }
                else {
                    ctrl.changeState('wait');
                }
            });

        setTimeout(() => { request.resolve({ complete: false }); }, 3000);
    }
}

Object.assign(RoundController.prototype, MinStateMachineMixin);
