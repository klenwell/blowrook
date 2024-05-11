class MatchView {
    constructor(controller) {
        this.controller = controller;
        this.match = controller.match;
        this.el = $('#match-view');
    }

    initScoreboard() {
        const userRow = this.el.find('tr.user');
        userRow.find('td.name').text(this.match.user);

        const opponentRow = this.el.find('tr.opponent');
        opponentRow.find('td.name').text(this.match.opponent.name);
    }

    show() {
        this.el.show();
    }

    hide() {
        this.el.hide();
    }
}
