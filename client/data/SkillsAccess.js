var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class SkillAccess {
    constructor() {
        this.apiUrl = 'http://localhost/tp/2024-R410-DUBOZ/server/api.php?action=get_skillsets&code=';
    }
    getSkillSets(codeDept) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(this.apiUrl + codeDept);
                const data = yield response.json();
                return data.map((skillSetObj) => SkillSet.createFromObject(skillSetObj));
            }
            catch (error) {
                console.error('Erreur de récupération des compétences:', error);
                throw error;
            }
        });
    }
    create(set, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const compositeObject = {
                skillSet: set,
                token: token
            };
            const str = JSON.stringify(compositeObject);
            let response = yield fetch("http://localhost/tp/2024-R410-DUBOZ/server/api.php?action=add_skillset", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json"
                },
                body: str
            });
            return response.ok;
        });
    }
    getSkillSetById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(`http://localhost/tp/2024-R410-DUBOZ/server/api.php?action=get_skillset&id=${id}`);
                const data = yield response.json();
                return SkillSet.createFromObject(data);
            }
            catch (error) {
                console.error('Erreur de récupération du SkillSet:', error);
                throw error;
            }
        });
    }
}
//# sourceMappingURL=SkillsAccess.js.map