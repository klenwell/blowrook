MatchStates = {
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
            controller.changeState('nextRound');
            //let roundController = new MatchRoundController(controller);
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
        this.initStates(MatchStates, 'up');
    }
}

Object.assign(MatchController.prototype, MinStateMachineMixin);
