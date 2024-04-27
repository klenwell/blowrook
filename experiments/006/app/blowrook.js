const AppSettings = {
    selector: 'app',
    userID: 'experiment',
    minRookRadius: 10,
    courtRadius: 100,
    centerRadius: 33,
    userColor: 'blue'
};

class BlowrookApp {
    constructor() {
        this.settings = AppSettings;
        this.ui = new BlowrookUI(this);
        this.apiClient = new ApiClient(this);
        this.court = new Court(this);
        this.match = new BlowrookMatch(this);
    }

    run() {
        this.ui.init();
        const matchData = this.apiClient.getMatch({ 'match_code': 'experiment' });
        this.match.start(matchData);
    }
}
