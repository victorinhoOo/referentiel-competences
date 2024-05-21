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
        this.apiUrl = 'https://grp-440.iq.iut21.u-bourgogne.fr/skills/server/api.php?action=get_skillsets&code=';
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
    create(set) {
        return __awaiter(this, void 0, void 0, function* () {
            const str = JSON.stringify(set);
            let response = yield fetch("https://grp-440.iq.iut21.u-bourgogne.fr/skills/server/api.php?action=add_skillset", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json"
                },
                body: str
            });
            let ret = true;
            if (!response.ok) {
                ret = false;
            }
            return ret;
        });
    }
}
//# sourceMappingURL=SkillsAccess.js.map