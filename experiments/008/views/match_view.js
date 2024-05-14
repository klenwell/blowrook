class MatchView {
    constructor(controller) {
        this.controller = controller;
        this.match = controller.match;
        this.el = $('#match-view');
        this.scoreboardEl = $('table#scoreboard');
        this.gameboardEl = $('div#gameboard');
    }

    initScoreboard() {
        const userRow = this.scoreboardEl.find('tr.user');
        userRow.find('td.name').text(this.match.user.name);

        const opponentRow = this.scoreboardEl.find('tr.opponent');
        opponentRow.find('td.name').text(this.match.opponent.name);

        this.scoreboardEl.on('scoreboard:update', (e, score) => {
            console.log(e, score);
        });
    }

    initGameboard() {
        this.gameboardEl.hide();
    }

    show() {
        this.el.show();
    }

    hide() {
        this.el.hide();
    }
}
