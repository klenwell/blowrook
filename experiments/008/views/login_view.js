class LoginView {
    constructor(app) {
        this.app = app;
        this.el = $('#login-view');
    }

    show() {
        this.el.show();
        this.initFormHandler();
    }

    hide() {
        this.el.hide();
    }

    initFormHandler() {
        const button = $('button#post-login-name');
        const nameField = $('input#login-name');
        const app = this.app;

        button.on('click', (e) => {
            let params = {
                name: nameField.val(),
                event: e
            };
            app.postLogin(params);
        });
    }
}
