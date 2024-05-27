var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class DepartmentAccess {
    constructor() {
        this.apiUrl = 'http://localhost/tp/2024-R410-DUBOZ/server/api.php?action=get_depts';
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(this.apiUrl);
                const data = yield response.json();
                const departments = data.map((deptData) => Department.createFromObject(deptData));
                return departments;
            }
            catch (error) {
                console.error('Erreur de récupération des départements:', error);
                throw error;
            }
        });
    }
}
//# sourceMappingURL=DepartmentAccess.js.map