class ApiClient {
    constructor(app) {
        this.app = app;
    }

    getMatch(params) {
        console.log('getMatch:', params);
        let response = BlowrookService.route('/blowrook/match?code=ID', params);
        console.log('getMatch response', response);
        return response;
    }

    postMove(minRook) {
        let params = {
            match_id: this.app.match.id,
            user_id: this.app.settings.userID,
            rook: minRook
        }
        console.log('Submit move:', params);

        let response = BlowrookService.route('/blowrook/match/ID/move', params);
        console.log("postMove Response", response);
        return response;
    }
}
