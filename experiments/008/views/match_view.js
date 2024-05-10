class MatchView {
    constructor(controller) {
        this.controller = controller;
        this.match = controller.match;
    }

    initPlayerForm() {
        const button = $('button#post-player-name');
        const nameField = $('input#player-name');
        const controller = this.controller;

        button.on('click', () => {
            console.log('click', this, $(this));
            let params = {
                name: nameField.text()
            };
            controller.postName(params);
        });
    }


}
