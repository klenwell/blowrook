class ApiClient {
    constructor(app) {
        this.app = app;
    }

    getMatch(params) {
        console.log('get match:', params);
        let response = BlowrookService.route('/blowrook/match?code=ID', params);
        return response;
    }

    postMove(minRook) {
        let params = {
            user_id: this.app.settings.UserID,
            rook: minRook
        }
        console.log('Submit move:', params);

        let response = BlowrookService.route('/blowrook/match/ID/move', params);
        console.log("Response", response);
        return response;
    }
}
