const MatchStates = {
    up: {
        enter: (controller) => {
            console.log('TODO: make match up');
            setTimeout(() => {
                controller.changeState('on');
            }, 2000);
        }
    },

    on: {
        enter: (controller) => {
            controller.changeState('nextRound');
        }
    },

    nextRound: {
        enter: (controller) => {
            if ( controller.match.isOver() ) {
                return controller.changeState('over');
            }

            controller.match.round += 1;
            let roundController = new RoundController(controller);
            roundController.changeState('move');
        }
    },

    over: {
        enter: (controller) => {
            controller.app.changeState('home');
        }
    }
}


class MatchController {
    constructor(app) {
        this.app = app;
        this.match = new Match();
        this.view = new MatchView();
        this.initStates(MatchStates);
    }
}

Object.assign(MatchController.prototype, MinStateMachineMixin);
