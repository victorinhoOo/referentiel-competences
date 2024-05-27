class User {
    getLogin() {
        return this.login;
    }
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
    hasRole(role) {
        return this.type === role;
    }
}
//# sourceMappingURL=User.js.map