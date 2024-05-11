const MatchStates = {
    up: {
        enter: (controller) => {
            controller.assignOpponent();
            console.log('assigned opponent:', controller.match.opponent);
            controller.view.initScoreboard();
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
        this.match.user = app.user;
        this.view = new MatchView(this);
        this.initStates(MatchStates);
    }

    assignOpponent() {
        this.match.opponent = new AiOpponent();
    }
}

Object.assign(MatchController.prototype, MinStateMachineMixin);
