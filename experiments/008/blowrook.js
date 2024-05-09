const AppStates = {
    home: {
        enter: (app) => {
            app.ui.home.show();
        },

        exit: (app) => {
            app.ui.home.hide();
        }
    },

    match: {
        enter: (app) => {
            app.ui.match.show();
            app.controller = new MatchController(app);
            app.controller.changeState('up');
        },

        exit: (app) => {
            app.controller = null;
            app.ui.match.hide();
        }
    }

};

class BlowrookApp {
    constructor() {
        this.ui = this.initUI();
        this.initStates(AppStates);
        this.ui.match.hide();
        this.controller = null;
    }

    initUI() {
        return {
            home: new HomeUI(this),
            match: new MatchUI(this)
        };
    }

    run() {
        console.log('BlowrookApp#run');
        this.changeState('home');
    }
}

Object.assign(BlowrookApp.prototype, MinStateMachineMixin);
