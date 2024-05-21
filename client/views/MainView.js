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
    constructor(selectId, selectSkillId) {
        this.selectElement = document.getElementById(selectId);
        this.departmentAccess = new DepartmentAccess();
        this.skillAccess = new SkillAccess();
        this.selectSkill = document.getElementById(selectSkillId);
        this.selectElement.onchange = () => this.ChooseDept();
        const competencesButton = document.getElementById("competencesButton");
        competencesButton.onclick = () => this.storeSkillSet();
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
    ChooseDept() {
        return __awaiter(this, void 0, void 0, function* () {
            const selectedDeptCode = this.selectElement.value;
            const skillSets = yield this.skillAccess.getSkillSets(selectedDeptCode);
            this.selectSkill.innerHTML = '';
            skillSets.forEach(skillSet => {
                const option = document.createElement('option');
                option.value = skillSet.getId.toString();
                option.textContent = skillSet.toString();
                this.selectSkill.appendChild(option);
            });
        });
    }
    storeSkillSet() {
        return __awaiter(this, void 0, void 0, function* () {
            const selectedIndex = this.selectSkill.selectedIndex;
            const selectedOption = this.selectSkill.options[selectedIndex];
            const skillSetId = selectedOption.value;
            try {
                const skillSet = yield this.skillAccess.getSkillSetById(skillSetId);
                const skillSetJson = JSON.stringify(skillSet);
                sessionStorage.setItem("skillset", skillSetJson);
            }
            catch (error) {
                console.error("Error storing skill set:", error);
            }
        });
    }
}
//# sourceMappingURL=MainView.js.map