var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class LoginView {
    constructor() {
        this.loginInput = document.getElementById('login');
        this.passwordInput = document.getElementById('password');
        this.userAccess = new UserAccess();
        const loginButton = document.getElementById('loginButton');
        loginButton.addEventListener('click', () => this.login());
    }
    login() {
        return __awaiter(this, void 0, void 0, function* () {
            const login = this.loginInput.value;
            const password = this.passwordInput.value;
            try {
                const token = yield this.userAccess.connectUser(login, password);
                sessionStorage.setItem('authToken', JSON.stringify(token));
                console.log(`Utilisateur ${token.getConnectedUser().getName()} connecté`);
            }
            catch (error) {
                console.error('Connexion échouée:', error);
            }
        });
    }
}
//# sourceMappingURL=LoginView.js.map