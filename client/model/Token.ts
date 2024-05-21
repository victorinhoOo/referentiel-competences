/// <reference path="../model/User.ts" />
//Gère les attributs d'un token
class Token {
    private header: string;
    private connectedUser: User;
    public getConnectedUser(): User {
        return this.connectedUser;
    }
    private signature: string;

    constructor(header: string, connectedUser: User, signature: string) {
        this.header = header;
        this.connectedUser = connectedUser;
        this.signature = signature;
    }

    static createFromObject(obj: any): Token {
        console.log(obj);
        const user = User.createFromObject(obj.connectedUser);
        return new Token(obj.header, user, obj.signature);
    }
}
