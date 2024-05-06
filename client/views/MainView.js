var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class MainView {
    constructor(selectId) {
        this.selectElement = document.getElementById(selectId);
        this.departmentAccess = new DepartmentAccess();
        this.init();
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.selectElement.innerHTML = '';
            const departments = yield this.departmentAccess.getAll();
            departments.forEach(department => {
                const option = document.createElement('option');
                option.value = department.code;
                option.textContent = department.toString();
                this.selectElement.appendChild(option);
            });
        });
    }
}
//# sourceMappingURL=MainView.js.map