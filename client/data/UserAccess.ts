/// <reference path="../model/User.ts" />
/// <reference path="../model/Token.ts" />
// Gère l'accès au service web de gestion des utilisateurs
class UserAccess{
    private apiUrl: string = 'http://grp-440.iq.iut21.u-bourgogne.fr/skills/server/api.php?action=login'

    // Permet la connexion d'un utilisateur
    public async connectUser(login: string, password: string): Promise<Token> {
        const url = new URL(this.apiUrl);
        url.searchParams.append("login", login);
        url.searchParams.append("password", password);
        try {
            console.log(url.toString());
            const response = await fetch(url.toString());
            const data = await response.json();
            return Token.createFromObject(data);
        } catch (error) {
            console.error('Erreur de connexion: ', error);
            throw error;
        }
    }
}