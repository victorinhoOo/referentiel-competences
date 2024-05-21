/// <reference path="../model/User.ts" />
/// <reference path="../model/Token.ts" />
class UserAccess{
    private apiUrl: string = 'https://grp-440.iq.iut21.u-bourgogne.fr/skills/server/api.php?action=login'

    public async connectUser(login: string, password: string): Promise<Token> {
        const url = new URL(this.apiUrl);
        url.searchParams.append("login", login);
        url.searchParams.append("password", password);
        try {
            const response = await fetch(url.toString());
            const data = await response.json();
            return Token.createFromObject(data.token);
        } catch (error) {
            console.error('Error connecting user:', error);
            throw error;
        }
    }
}