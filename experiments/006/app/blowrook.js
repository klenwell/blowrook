const AppSettings = {
    selector: 'app',
    minRookSize: 10,
    courtRadius: 100,
    centerRadius: 33
};

class BlowrookApp {
    constructor() {
        this.settings = AppSettings;
        this.ui = new BlowrookUI(this);
        this.apiClient = new ApiClient();
        this.court = new Court(this);
        this.match = new BlowrookMatch(this);
    }

    run() {
        this.ui.init();
        const matchData = this.apiClient.postMatch({
            'match_code': 'experiment',
            'user_id': 'experiment'
        });
        this.match.start(matchData);
    }
}
