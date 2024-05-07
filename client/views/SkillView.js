var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class SkillView {
    constructor() {
        this.departmentSelect = document.getElementById('departmentSelect');
        this.levelInput = document.getElementById('repoLevel');
        this.nameInput = document.getElementById('repoName');
        this.dateInput = document.getElementById('repoDate');
        this.departmentAccess = new DepartmentAccess();
        this.currentSkillNumber = 0;
        this.labels = [];
        this.numbers = [];
        this.lists = [];
        this.init();
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.departmentSelect.innerHTML = '';
            const departments = yield this.departmentAccess.getAll();
            departments.forEach(department => {
                const option = document.createElement('option');
                option.value = department.code;
                option.textContent = department.toString();
                this.departmentSelect.appendChild(option);
            });
            this.levelInput.value = '1';
            this.dateInput.valueAsDate = new Date();
        });
    }
}
//# sourceMappingURL=SkillView.js.map