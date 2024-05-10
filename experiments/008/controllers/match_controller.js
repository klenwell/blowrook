const MatchStates = {
    up: {
        enter: (controller) => {
            controller.view.initPlayerForm();
        }
    },

    on: {
        enter: (controller) => {
            throw 'TODO';
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
        this.view = new MatchView(this);
        this.initStates(MatchStates);
    }

    postName(params) {
        this.match.savePlayer(params.name);
        this.changeState('on');
    }
}

Object.assign(MatchController.prototype, MinStateMachineMixin);
