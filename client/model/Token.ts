/// <reference path="../model/User.ts" />
/// <reference path="../model/Exceptions/TokenError.ts" />
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

    /**
     * Créé un token à partir d'un objet
     */
    public static createFromObject(obj: any): Token {
        console.log(obj);
        const user = User.createFromObject(obj.connectedUser);
        return new Token(obj.header, user, obj.signature);
    }

    /**
     * Créé un token depuis la session storage
     * @returns token stocké dans la session
     */
    public static createFromSessionStorage(): Token {
        const tokenString = sessionStorage.getItem('authToken');
        if (!tokenString) {
            throw new TokenError("No token found in Session storage");
        }
        try {
            const tokenObj = JSON.parse(tokenString);
            return Token.createFromObject(tokenObj);
        } catch (e) {
            throw new TokenError("Failed to parse Session token: " + e.message);
        }
    }

    /**
     * Vérifie si l'utilisateur associé au token possède un rôle spécifique
     * @returns Vrai si l'utilisateur possède le rôle
     */
    public userHasRole(role: string): boolean{
        return this.connectedUser.hasRole(role);
    }
}
