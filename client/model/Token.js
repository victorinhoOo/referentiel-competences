class Token {
    getConnectedUser() {
        return this.connectedUser;
    }
    constructor(header, connectedUser, signature) {
        this.header = header;
        this.connectedUser = connectedUser;
        this.signature = signature;
    }
    static createFromObject(obj) {
        console.log(obj);
        const user = User.createFromObject(obj.connectedUser);
        return new Token(obj.header, user, obj.signature);
    }
}
//# sourceMappingURL=Token.js.map