const MatchStates = {
    up: {
        enter: (controller) => {
            controller.assignOpponent();
            console.log('assigned opponent:', controller.match.opponent);
            controller.view.initScoreboard();
            controller.view.initGameboard();
            controller.view.show();
            controller.changeState('nextRound');
        }
    },

    nextRound: {
        enter: (controller) => {
            if ( controller.match.isOver() ) {
                return controller.changeState('over');
            }

            controller.match.round += 1;
            controller.roundController = new RoundController(controller);
            controller.roundController.changeState('move');
        },

        exit: (controller) => {
            controller.roundController = null;
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
        this.match.user = app.user;
        this.view = new MatchView(this);
        this.roundController = null;
        this.initStates(MatchStates);
    }

    assignOpponent() {
        this.match.opponent = new AiOpponent();
    }

    postMove(params) {
        this.roundController.postMove(params);
    }
}

Object.assign(MatchController.prototype, MinStateMachineMixin);
