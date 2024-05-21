class HomeView {
    constructor(app) {
        this.app = app;
        this.el = $('#home-view');
    }

    get matchButton() {
        return $('button#get-match');
    }

    get exitButton() {
        return $('button#post-logout');
    }

    show() {
        this.el.show();
        this.enableFormHandler();
    }

    hide() {
        this.disableFormHandler();
        this.el.hide();
    }

    enableFormHandler() {
        const app = this.app;

        this.matchButton.on('click', (e) => {
            app.getMatch();
        });

        this.exitButton.on('click', (e) => {
            app.postLogout();
        });
    }

    disableFormHandler() {
        this.matchButton.off();
        this.exitButton.off();
    }
}
