// Gère les attributs d'un utilisateur
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

    /**
     * Créé un utilisateur à partir d'un objet
     */
    public static createFromObject(obj: any): User {
        return new User(obj.login, obj.name, obj.type);
    }

    /**
     * Vérifie si l'utilisateur possède un role en particulier
     * @param role rôle à vérifier
     * @returns Vrai si l'utilisateur possède le rôle
     */
    public hasRole(role: string): boolean {
        return this.type === role;
    }
}
