class Fixture {
    static id = 0;

    static player(name) {
        let email = `${name}@example.com`;
        Fixture.id++;
        return new Player({
            id: Fixture.id,
            name: name,
            email: email
        });
    }

    static staticMethod() {
    return 'static method has been called.';
  }
}
