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
            handler = new RoundHandler(controller);
            handler.changeState('move');
        },

        exit: (controller) => {
            console.log(`Round ${controller.match.roundNumber} over`)
        }
    },

    over: {
        enter: (controller) => {
            throw 'match over'
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

    postMove(params) {
        this.roundController.postMove(params);
    }
}

Object.assign(MatchController.prototype, MinStateMachineMixin);
