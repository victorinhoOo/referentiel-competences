var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class AssessmentView {
    constructor() {
        const token = Token.createFromSessionStorage();
        if (!token) {
            window.location.href = 'login.html';
        }
        const skillSet = JSON.parse(sessionStorage.getItem('skillset'));
        const skillSetId = skillSet.id;
        if (!skillSetId) {
            alert('No skill set selected. Redirecting to the main page.');
            window.location.href = 'index.html';
        }
        console.log('Retrieved skill set ID:', skillSetId);
        this.skillAccess = new SkillAccess();
        this.assessmentAccess = new AssessmentAccess();
        this.currentSkillIndex = 0;
        this.currentComponentIndex = 0;
        this.init(parseInt(skillSetId));
        this.quizzDiv = document.getElementById('quizz');
        this.currentUser = Token.createFromSessionStorage().getConnectedUser();
    }
    init(skillSetId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const skillSet = yield this.skillAccess.getSkillSetById(skillSetId);
                this.skillSet = skillSet;
                console.log('SkillSet loaded:', this.skillSet);
                if (this.skillSet && this.skillSet.getName) {
                    document.title = this.skillSet.getName();
                }
                const firstSkill = this.skillSet.getSkillAtIndex(0);
                if (firstSkill) {
                    this.askForSkill(firstSkill);
                }
                else {
                    console.error('No skills found in the skill set.');
                }
            }
            catch (error) {
                console.error('Error retrieving SkillSet:', error);
                alert('Failed to load the skill set data.');
            }
        });
    }
    askNextSkill() {
        if (this.currentSkillIndex < this.skillSet.getSkills().length) {
            const skill = this.skillSet.getSkills()[this.currentSkillIndex];
            this.askForSkill(skill);
        }
        else {
            this.showSubmitButton();
        }
    }
    askForSkill(skill) {
        const skillDiv = document.createElement('div');
        skillDiv.className = 'skill';
        skillDiv.id = `skill_${skill.getId()}`;
        skillDiv.setAttribute('data-id', skill.getId().toString());
        const questionP = document.createElement('p');
        questionP.textContent = `Pouvez-vous : ${skill.getLabel()}?`;
        skillDiv.appendChild(questionP);
        this.createInputOption(skillDiv, skill.getId(), 'oui', 'Oui', 'skill', () => {
            this.currentComponentIndex = 0;
            if (skill.getComponents().length > 0) {
                this.askForComponent(skill.getComponents()[this.currentComponentIndex]);
            }
            else {
                this.currentSkillIndex++;
                this.askNextSkill();
            }
        });
        this.createInputOption(skillDiv, skill.getId(), 'non', 'Non', 'skill', () => {
            this.currentSkillIndex++;
            this.askNextSkill();
        });
        this.createInputOption(skillDiv, skill.getId(), 'nonAppliquable', 'Non appliquable', 'skill', () => {
            this.currentSkillIndex++;
            this.askNextSkill();
        });
        this.quizzDiv.appendChild(skillDiv);
    }
    askForComponent(component) {
        const componentDiv = document.createElement('div');
        componentDiv.className = 'component';
        componentDiv.id = `component_${component.getId()}`;
        componentDiv.setAttribute('data-id', component.getId().toString());
        const questionP = document.createElement('p');
        questionP.textContent = `${component.getLabel()}?`;
        componentDiv.appendChild(questionP);
        this.createInputOption(componentDiv, component.getId(), 'oui', 'Oui', 'component', () => this.handleComponentResponse());
        this.createInputOption(componentDiv, component.getId(), 'non', 'Non', 'component', () => this.handleComponentResponse());
        this.createInputOption(componentDiv, component.getId(), 'nonAppliquable', 'Non appliquable', 'component', () => this.handleComponentResponse());
        if (this.quizzDiv) {
            this.quizzDiv.appendChild(componentDiv);
        }
        else {
            console.error('Quizz division not found.');
        }
    }
    handleComponentResponse() {
        const components = this.skillSet.getSkills()[this.currentSkillIndex].getComponents();
        this.currentComponentIndex++;
        if (this.currentComponentIndex < components.length) {
            this.askForComponent(components[this.currentComponentIndex]);
        }
        else {
            this.currentSkillIndex++;
            this.askNextSkill();
        }
    }
    createInputOption(parent, id, option, optionText, type, callback) {
        const optionId = `${type}_${option}_${id}`;
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = `${type}_${id}`;
        input.value = option;
        input.id = optionId;
        const label = document.createElement('label');
        label.htmlFor = optionId;
        label.textContent = optionText;
        parent.appendChild(input);
        parent.appendChild(label);
        if (callback && option === 'oui') {
            input.addEventListener('click', callback);
        }
    }
    showSubmitButton() {
        const submitButton = document.createElement('button');
        submitButton.textContent = "Valider l'évaluation";
        submitButton.onclick = () => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.submitAssessment();
                alert('Évaluation soumise avec succès !');
                window.location.href = 'index.html';
            }
            catch (error) {
                console.error('Erreur lors de la soumission de l\'évaluation:', error);
                alert('Échec de la soumission de l\'évaluation. Veuillez réessayer.');
            }
        });
        if (this.quizzDiv) {
            this.quizzDiv.appendChild(submitButton);
        }
    }
    readSkillAnswers() {
        let divs = document.querySelectorAll(".skill");
        let skillAnswers = new Map();
        divs.forEach(div => {
            let id_skill = parseInt(div.getAttribute('data-id'));
            const selected = document.querySelector(`input[name='skill_${id_skill}']:checked`);
            console.log(selected.value);
            if (selected) {
                switch (selected.value) {
                    case "oui":
                        skillAnswers.set(id_skill, ValidationLevel.Validated);
                        break;
                    case "nonAppliquable":
                        skillAnswers.set(id_skill, ValidationLevel.NotApplicable);
                        break;
                    default:
                        skillAnswers.set(id_skill, ValidationLevel.NotValidated);
                        break;
                }
            }
            else {
                skillAnswers.set(id_skill, ValidationLevel.NotValidated);
            }
        });
        return skillAnswers;
    }
    readComponentAnswers() {
        let divs = document.querySelectorAll(".component");
        let componentAnswers = new Map();
        divs.forEach(div => {
            let id_component = parseInt(div.getAttribute('data-id'));
            const selected = document.querySelector(`input[name='component_${id_component}']:checked`);
            if (selected && selected.value === "oui") {
                componentAnswers.set(id_component, ValidationLevel.Validated);
            }
            else if (selected && selected.value === "nonAppliquable") {
                componentAnswers.set(id_component, ValidationLevel.NotApplicable);
            }
            else {
                componentAnswers.set(id_component, ValidationLevel.NotValidated);
            }
        });
        return componentAnswers;
    }
    submitAssessment() {
        return __awaiter(this, void 0, void 0, function* () {
            let assessment = new Assessment(this.currentUser, this.skillSet, true);
            let skillAnswers = this.readSkillAnswers();
            let componentAnswers = this.readComponentAnswers();
            console.log(skillAnswers);
            console.log(componentAnswers);
            skillAnswers.forEach((level, idSkill) => {
                let skill = this.skillSet.getSkillAtIndex(idSkill);
                if (skill) {
                    assessment.addValidation(skill, level);
                }
            });
            componentAnswers.forEach((level, idComponent) => {
                let component = this.findComponentById(idComponent);
                if (component) {
                    assessment.addValidation(component, level);
                }
            });
            console.log('Assessment prepared:', assessment.toObject());
            this.assessmentAccess.createAssessment(assessment);
        });
    }
    findComponentById(idComponent) {
        for (let skill of this.skillSet.getSkills()) {
            for (let component of skill.getComponents()) {
                if (component.getId() === idComponent) {
                    return component;
                }
            }
        }
        return null;
    }
}
//# sourceMappingURL=AssessmentView.js.map