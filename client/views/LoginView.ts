/// <reference path="../data/UserAccess.ts" />
class LoginView {
    private loginInput: HTMLInputElement;
    private passwordInput: HTMLInputElement;
    private userAccess: UserAccess;

    constructor() {
        this.loginInput = document.getElementById('login') as HTMLInputElement;
        this.passwordInput = document.getElementById('password') as HTMLInputElement;
        this.userAccess = new UserAccess();

        const loginButton = document.getElementById('loginButton') as HTMLButtonElement;
        loginButton.addEventListener('click', () => this.login());
    }

    private async login(): Promise<void> {
        const login = this.loginInput.value;
        const password = this.passwordInput.value;

        try {
            const token = await this.userAccess.connectUser(login, password);
            sessionStorage.setItem('authToken', JSON.stringify(token));
            console.log(`Utilisateur ${token.getConnectedUser().getName()} connecté`); 
        } catch (error) {
            console.error('Connexion échouée:', error);
        }
    }
}
