class User {
    getName() {
        return this.name;
    }
    constructor(login, name, type) {
        this.login = login;
        this.name = name;
        this.type = type;
    }
    static createFromObject(obj) {
        return new User(obj.login, obj.name, obj.type);
    }
}
//# sourceMappingURL=User.js.map