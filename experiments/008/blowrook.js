const AppStates = {
    init: {
        enter: (app) => {
            if ( app.user ) {
                app.changeState('home');
            }
            else {
                app.changeState('login')
            }
        }
    },

    home: {
        enter: (app) => {
            $('#home-view').show();
        },

        exit: (app) => {
            $('#home-view').hide();
        }
    },

    login: {
        enter: (app) => {
            app.view = new LoginView(app);
            app.view.show();
        },

        exit: (app) => {
            app.view.hide();
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
        this.controller = null;
        this.view = null;
        this.user = null;
    }

    run() {
        console.log('BlowrookApp#run');
        this.initStates(AppStates);
    }

    postName(params) {
        this.user = params.name;
        this.changeState('home');
    }
}

Object.assign(BlowrookApp.prototype, MinStateMachineMixin);
