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

        $('td.round, td.final').text(0);

        this.scoreboardEl.on('scoreboard:update', (e, score) => {
            console.log('scoreboard:update', e, this.match.scores);
        });
    }

    initGameboard() {
        this.gameboardEl.hide();
    }

    updateScoreboardRound(round) {
        console.info(round);
        const userRow = this.scoreboardEl.find('tr.user');
        const opponentRow = this.scoreboardEl.find('tr.opponent');
        const tdSel = `td.round-${round.number}`;

        userRow.find(tdSel).text(round.scores.user);
        opponentRow.find(tdSel).text(round.scores.opponent);
    }

    updateScoreboardTotal(match) {
        const userRow = this.scoreboardEl.find('tr.user');
        const opponentRow = this.scoreboardEl.find('tr.opponent');
        const tdSel = 'td.final';

        userRow.find(tdSel).text(match.scores.user);
        opponentRow.find(tdSel).text(match.scores.opponent);
    }

    showMessage() {
        let ctrl = this.controller;
        $('#message').show();
        $('#get-new-match').on('click', () => {
            this.controller.getNewMatch();
        });
    }

    hideMessage() {
        $('#message').hide();
        $('#get-new-match').off();
    }

    show() {
        this.el.show();
    }

    hide() {
        this.el.hide();
        this.hideMessage();
    }
}
