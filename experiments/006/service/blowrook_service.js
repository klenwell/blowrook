class BlowrookService {
    static accept(path, params) {
        console.log('BlowrookService.accept', path, params);
        let service = new BlowrookService()

        let routes = {
            '/blowrook/match/ID/move': service.postMove(params),
        }

        let response = routes[path]
        console.log('response', response);
        return response;
      }

    constructor() {
    }

    postMove(params) {
        // get match state
        // sim computer move
        // update board
        // return match state
        return {
            round: 2,
            score: 'TBA'
        }
    }
}
