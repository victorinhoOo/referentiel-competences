var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class UserAccess {
    constructor() {
        this.apiUrl = 'https://grp-440.iq.iut21.u-bourgogne.fr/skills/server/api.php?action=login';
    }
    connectUser(login, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = new URL(this.apiUrl);
            url.searchParams.append("login", login);
            url.searchParams.append("password", password);
            try {
                const response = yield fetch(url.toString());
                const data = yield response.json();
                return Token.createFromObject(data);
            }
            catch (error) {
                console.error('Erreur de connexion: ', error);
                throw error;
            }
        });
    }
}
//# sourceMappingURL=UserAccess.js.map