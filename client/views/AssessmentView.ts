/// <reference path="../model/Token.ts" />
/// <reference path="../model/SkillSet.ts" />
/// <reference path="../data/SkillsAccess.ts" />
/// <reference path="../data/AssessmentAccess.ts" />
/// <reference path="../model/Skill.ts"/>
class AssessmentView{
    private skillSet: SkillSet;
    private skillAccess: SkillAccess;
    private assessmentAccess: AssessmentAccess;
    private quizzDiv: HTMLDivElement | null;
    private currentSkillIndex: number;
    private currentComponentIndex: number;
    private currentUser: User;

    /**
     * Initialise les attributs, vérifie la session et charge les données du référentiels de compétences
     */
    public constructor() {
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
        this.quizzDiv = document.getElementById('quizz') as HTMLDivElement;
        this.currentUser = Token.createFromSessionStorage().getConnectedUser();
    }

    /**
     * charge les détails d'un SkillSet depuis le serveur,
     * met à jour le titre de la page et stocke le SkillSet 
     * @param {number} id du SkillSet à charger.
     */
    private async init(skillSetId: number): Promise<void> {
        try {
            const skillSet = await this.skillAccess.getSkillSetById(skillSetId); 
            this.skillSet = skillSet; 
            console.log('SkillSet loaded:', this.skillSet);

            // maj du titre de la page avec le nom du SkillSet
            if (this.skillSet && this.skillSet.getName) {
                document.title = this.skillSet.getName();
            }

            // on commence le quizz avec le premier skill si disponible
            const firstSkill = this.skillSet.getSkillAtIndex(0);
            if (firstSkill) {
                this.askForSkill(firstSkill);
            } else {
                console.error('No skills found in the skill set.');
            }
        } catch (error) {
            console.error('Error retrieving SkillSet:', error);
            alert('Failed to load the skill set data.');
        }
    }

    // Passe à la compétence suivante dans le quiz ou finit le quiz en affichant un bouton de fin
    private askNextSkill(): void {
        if (this.currentSkillIndex < this.skillSet.getSkills().length) {
            const skill = this.skillSet.getSkills()[this.currentSkillIndex];
            this.askForSkill(skill);
        } else {
            this.showSubmitButton();
        }
    }

    /**
     * Créé les éléments de la vue pour les questions sur les compétences
     * @param skill compétence que l'on souhaite interroger
     */
    private askForSkill(skill: Skill): void {
        const skillDiv = document.createElement('div');
        skillDiv.className = 'skill';
        skillDiv.id = `skill_${skill.getId()}`;
        skillDiv.setAttribute('data-id', skill.getId().toString());

        const questionP = document.createElement('p');
        questionP.textContent = `Pouvez-vous : ${skill.getLabel()}?`;
        skillDiv.appendChild(questionP);

        // Configure les options à cocher et attache des callbacks pour réagir aux réponses
        this.createInputOption(skillDiv, skill.getId(), 'oui', 'Oui', 'skill', () => {
            this.currentComponentIndex = 0; 
            if (skill.getComponents().length > 0) {
                this.askForComponent(skill.getComponents()[this.currentComponentIndex]);
            } else {
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

    /**
     * Créé les éléments de la vue pour les questions sur les composants
     * @param skill composant que l'on souhaite interroger
     */
    private askForComponent(component: Component): void {
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
        } else {
            console.error('Quizz division not found.');
        }
    }

    /**
     * Détermine le prochain composant à interroger ou passe à la compétence suivante
     */
    private handleComponentResponse(): void {
        const components = this.skillSet.getSkills()[this.currentSkillIndex].getComponents();
        this.currentComponentIndex++;
        if (this.currentComponentIndex < components.length) {
            this.askForComponent(components[this.currentComponentIndex]);
        } else {
            this.currentSkillIndex++;
            this.askNextSkill();
        }
    }
    
    /**
     * Créé des input pour les questions, avec des callbacks éventuels pour réagir aux réponses
     */
    private createInputOption(parent: HTMLElement, id: number, option: string, optionText: string, type: string, callback?: () => void): void {
        const optionId = `${type}_${option}_${id}`;
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = `${type}_${id}`; // on utilise le type pour différencier les noms
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

    /**
     * Affiche un bouton pour finir le quiz
     */
    private showSubmitButton(): void {
        const submitButton = document.createElement('button');
        submitButton.textContent = 'Valider';
        submitButton.onclick = async () => {
            try {
                await this.submitAssessment();
                alert('Évaluation soumise avec succès !');
                window.location.href = 'index.html';

            } catch (error) {
                console.error('Erreur lors de la soumission de l\'évaluation:', error);
                alert('Échec de la soumission de l\'évaluation. Veuillez réessayer.');
            }
        };
        if (this.quizzDiv) {
            this.quizzDiv.appendChild(submitButton);
        }
    }

    /**
     * Lis les résultats de réponse aux questions sur les compétences
     * @returns Taux de validation de cette partie du quizz
     */
    public readSkillAnswers(): Map<number, ValidationLevel> {
        let divs = document.querySelectorAll(".skill");
        let skillAnswers = new Map<number, ValidationLevel>();
    
        divs.forEach(div => {
            let id_skill = parseInt(div.getAttribute('data-id')); // ICI
            const selected = document.querySelector(`input[name='skill_${id_skill}']:checked`) as HTMLInputElement;
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
            } else {
                skillAnswers.set(id_skill, ValidationLevel.NotValidated);
            }
            
        });
        return skillAnswers;
    }

    /**
     * Lis les résultats de réponse aux questions sur les composants
     * @returns Taux de validation de cette partie du quizz
     */
    public readComponentAnswers(): Map<number, ValidationLevel> {
        let divs = document.querySelectorAll(".component");
        let componentAnswers = new Map<number, ValidationLevel>();
    
        divs.forEach(div => {
            let id_component = parseInt(div.getAttribute('data-id'));
            const selected = document.querySelector(`input[name='component_${id_component}']:checked`) as HTMLInputElement;
            if (selected && selected.value === "oui") {
                componentAnswers.set(id_component, ValidationLevel.Validated);
            } else if(selected && selected.value === "nonAppliquable") {
                componentAnswers.set(id_component, ValidationLevel.NotApplicable); 
            } else {
                componentAnswers.set(id_component, ValidationLevel.NotValidated)
            }
        });
    
        return componentAnswers;
    }

    /**
     * Valide le quizz
     */
    public async submitAssessment(): Promise<void> {
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
    }
    
    private findComponentById(idComponent: number): Component | null {
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