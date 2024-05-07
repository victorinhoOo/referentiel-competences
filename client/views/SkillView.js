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
        let addButton = document.getElementById("addNewSkillButton");
        addButton.addEventListener("click", () => {
            this.addNewSkill();
        });
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
    createInputFieldForSkillNumber(div) {
        let labelId = "number" + this.currentSkillNumber.toString();
        let label = document.createElement("label");
        label.innerHTML = "Skill number:";
        label.setAttribute("for", labelId);
        div.appendChild(label);
        let input = document.createElement("input");
        input.id = labelId;
        input.type = "number";
        input.value = this.currentSkillNumber.toString();
        this.numbers.push(input);
        div.appendChild(input);
    }
    createInputForSkillName(div) {
        let labelId = "name" + this.currentSkillNumber.toString();
        let label = document.createElement("label");
        label.innerHTML = "Skill name:";
        label.setAttribute("for", labelId);
        div.appendChild(label);
        let input = document.createElement("input");
        input.id = labelId;
        input.type = "text";
        div.appendChild(input);
    }
    createDivForManageComponents(div) {
        let subDiv = document.createElement("div");
        let label = document.createElement("label");
        label.innerHTML = "Component:";
        subDiv.appendChild(label);
        let input = document.createElement("input");
        input.type = "text";
        subDiv.appendChild(input);
        let button = document.createElement("button");
        button.innerHTML = "Add Component";
        button.onclick = () => {
            let listItem = document.createElement("li");
            listItem.textContent = input.value;
            this.lists[this.lists.length - 1].appendChild(listItem);
            input.value = "";
        };
        subDiv.appendChild(button);
        let ul = document.createElement("ul");
        subDiv.appendChild(ul);
        div.appendChild(subDiv);
        this.lists.push(ul);
    }
    addNewSkill() {
        let skillDiv = document.createElement("div");
        let skillsContainer = document.getElementById("skills");
        skillsContainer.appendChild(skillDiv);
        this.currentSkillNumber++;
        this.createInputFieldForSkillNumber(skillDiv);
        this.createInputForSkillName(skillDiv);
        this.createDivForManageComponents(skillDiv);
    }
}
//# sourceMappingURL=SkillView.js.map