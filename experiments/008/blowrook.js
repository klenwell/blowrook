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
        },

        exit: (app) => {
            app.ui.match.hide()
        }
    }

};

class BlowrookApp {
    constructor() {
        this.initStates(AppStates, 'home');
    }

    run() {
        console.log('BlowrookApp#run')
    }
}

Object.assign(BlowrookApp.prototype, MinStateMachineMixin);
