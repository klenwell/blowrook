class ApiClient {
    postMatch(params) {
        console.log('Submit match:', params);
    }

    postMove(minRook) {
        console.log('Submit move:', minRook);
        let response = BlowrookService.accept('/blowrook/match/ID/move', minRook);
        console.log("Response", response);
        return response;
    }
}
