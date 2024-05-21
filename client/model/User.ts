class User {
    private login: string;
    private name: string;
    public getName(): string {
        return this.name;
    }
    private type: string;

    constructor(login: string, name: string, type: string) {
        this.login = login;
        this.name = name;
        this.type = type;
    }

    static createFromObject(obj: any): User {
        return new User(obj.login, obj.name, obj.type);
    }
}
