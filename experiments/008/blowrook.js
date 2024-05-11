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
            app.view = new HomeView(app);
            app.view.show();
        },

        exit: (app) => {
            app.view.hide();
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
            app.controller = new MatchController(app);
            app.controller.changeState('up');
        },

        exit: (app) => {
            app.controller.view.hide();
            app.controller = null;
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

    getMatch() {
        this.changeState('match');
    }

    postLogout() {
        this.user = null;
        this.changeState('login');
    }
}

Object.assign(BlowrookApp.prototype, MinStateMachineMixin);
