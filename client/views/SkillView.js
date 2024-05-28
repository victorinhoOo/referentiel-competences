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
        try {
            this.token = Token.createFromSessionStorage();
            if (!this.token.userHasRole("chief")) {
                alert("Vous n'avez pas les permissions pour accéder à cette page");
                window.location.href = "login.html";
            }
        }
        catch (e) {
            console.log(e);
            alert("Vous n'êtes pas connecté");
            window.location.href = "login.html";
        }
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
        let createButton = document.getElementById("createButton");
        createButton.addEventListener("click", (e) => {
            e.preventDefault();
            this.createSkillSet();
            return false;
        });
        let cancelButton = document.getElementById("cancelButton");
        cancelButton.addEventListener("click", () => this.redirectToHomepage());
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
        this.labels.push(input);
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
        button.type = "button";
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
    createSkillSet() {
        return __awaiter(this, void 0, void 0, function* () {
            const selectedDeptCode = this.departmentSelect.value;
            let newSkillSet = new SkillSet(selectedDeptCode);
            newSkillSet.setName(this.nameInput.value);
            newSkillSet.setLevel(parseInt(this.levelInput.value));
            newSkillSet.setDate(new Date(this.dateInput.value));
            newSkillSet.setActive(true);
            for (let i = 0; i < this.currentSkillNumber; i++) {
                let skill = new Skill();
                skill.setId(parseInt(this.numbers[i].value));
                skill.setLabel(this.labels[i].value);
                skill.setNumber(parseInt(this.numbers[i].value));
                console.log("List children:", this.lists[i].children);
                for (let item of this.lists[i].children) {
                    console.log("Processing item:", item, "Content:", item.textContent);
                    let component = new Component();
                    component.setLabel(item.textContent);
                    skill.addComponent(component);
                }
                newSkillSet.addSkill(skill);
                console.log(skill);
            }
            console.log(newSkillSet);
            let skillAccess = new SkillAccess();
            try {
                let result = yield skillAccess.create(newSkillSet, this.token);
                if (result) {
                    alert("SkillSet created successfully!");
                    window.location.href = "index.html";
                }
                else {
                    alert("Failed to create SkillSet.");
                }
            }
            catch (error) {
                console.error('Failed to save the skill set:', error);
                alert("Error creating SkillSet: " + error.message);
            }
        });
    }
    redirectToHomepage() {
        window.location.href = "index.html";
    }
}
//# sourceMappingURL=SkillView.js.map