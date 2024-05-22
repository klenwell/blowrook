class Player {
    constructor(params) {
        this.id = params.id;
        this.name = params.name;
        this.email = params.email;
    }

    data() {
        return {
            id: this.id,
            name: this.name
        }
    }
}
