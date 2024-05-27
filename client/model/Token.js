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
    static createFromSessionStorage() {
        const tokenString = sessionStorage.getItem('authToken');
        if (!tokenString) {
            throw new TokenError("No token found in Session storage");
        }
        try {
            const tokenObj = JSON.parse(tokenString);
            return Token.createFromObject(tokenObj);
        }
        catch (e) {
            throw new TokenError("Failed to parse Session token: " + e.message);
        }
    }
    userHasRole(role) {
        return this.connectedUser.hasRole(role);
    }
}
//# sourceMappingURL=Token.js.map