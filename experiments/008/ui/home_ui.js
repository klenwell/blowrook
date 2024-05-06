class HomeUI {
    constructor(app) {
        this.app = app;
        this.view = $('#home-view');
        this.matchButton = $('button#to-match');
        this.addListeners();
    }

    addListeners() {
        let app = this.app;
        this.matchButton.on('click', (event) => {
            this.app.changeState('match');
        });
    }

    show() {
        this.view.show();
    }

    hide() {
        this.view.hide();
    }
}
