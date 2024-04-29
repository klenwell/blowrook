class BlowrookService {
    static route(path, params) {
        console.log('BlowrookService.route', path, params);
        let service = new BlowrookService()

        let routes = {
            '/blowrook/match?code=ID': () => { return service.getMatch(params) },
            '/blowrook/match/ID/move': () => { return service.postMove(params) },
        }

        let action = routes[path];
        let response = action();
        console.log('BlowrookService.route response', response);
        return response;
      }

    constructor() {
    }

    getMatch(params) {
        let match = new MatchModel('exp006');
        match.state = 'matched';
        match.save();

        return {
            match_id: match.id,
            state: match.state
        };
    }

    postMove(params) {
        // get match
        let match = MatchModel.loadById(params['match_id']);

        // user move
        let userMove = new RookMove(params['rook'], params['user_id']);

        // sim computer move
        let ai = new BlowrookAI();
        let aiMove = ai.move(match)

        // update board
        match.addMove(userMove);
        match.addMove(aiMove);
        match.scoreRound();

        // return match state
        return {
            match: match.jsonData,
            user_move: userMove,
            ai_move: aiMove
        }
    }
}
