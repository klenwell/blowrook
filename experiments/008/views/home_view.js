class HomeView {
    constructor(app) {
        this.app = app;
        this.el = $('#home-view');
    }

    show() {
        this.el.show();
        this.initFormHandler();
    }

    hide() {
        this.el.hide();
    }

    initFormHandler() {
        const matchButton = $('button#get-match');
        const exitButton = $('button#post-logout');
        const app = this.app;

        matchButton.on('click', (e) => {
            app.getMatch();
        });

        exitButton.on('click', (e) => {
            app.postLogout();
        });
    }
}
