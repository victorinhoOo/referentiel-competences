/// <reference path="../data/DepartmentAccess.ts" />
/// <reference path="../model/Token.ts" />
// Gère l'affichage du référentiel d'activité
class SkillView {
    private departmentSelect: HTMLSelectElement;
    private departmentAccess: DepartmentAccess;
    private levelInput: HTMLInputElement;
    private nameInput: HTMLInputElement;
    private dateInput: HTMLInputElement;

    private currentSkillNumber: number;
    private labels: Array<HTMLInputElement>;
    private numbers: Array<HTMLInputElement>;
    private lists: Array<HTMLUListElement>;

    private token: Token;

    /**
     * Initialise les différents éléments HTML et ajoute des events listeners sur les boutons
     */
    constructor() {
        try {
            this.token = Token.createFromSessionStorage();
            if(!this.token.userHasRole("chief")){
                alert("Vous n'avez pas les permissions pour accéder à cette page");
                window.location.href = "login.html";
            }
        }
        catch (e) {
            console.log(e);
            alert("Vous n'êtes pas connecté");
            window.location.href = "login.html";
        }
        this.departmentSelect = document.getElementById('departmentSelect') as HTMLSelectElement;
        this.levelInput = document.getElementById('repoLevel') as HTMLInputElement;
        this.nameInput = document.getElementById('repoName') as HTMLInputElement;
        this.dateInput = document.getElementById('repoDate') as HTMLInputElement;
        this.departmentAccess = new DepartmentAccess();

        this.currentSkillNumber = 0;
        this.labels = [];
        this.numbers = [];
        this.lists = [];

        let addButton = document.getElementById("addNewSkillButton") as HTMLButtonElement;
        addButton.addEventListener("click", () => {
            this.addNewSkill()
        });

        let createButton = document.getElementById("createButton") as HTMLButtonElement;
        createButton.addEventListener("click", (e) =>{
            e.preventDefault();
            this.createSkillSet();
            return false;
        });

        let cancelButton = document.getElementById("cancelButton") as HTMLButtonElement;
        cancelButton.addEventListener("click", () => this.redirectToHomepage());

        this.init();
    }

    // Obtient et affiche les départements
    private async init(): Promise<void> {
        this.departmentSelect.innerHTML = '';
        const departments = await this.departmentAccess.getAll();
        departments.forEach(department => {
            const option = document.createElement('option');
            option.value = department.code;
            option.textContent = department.toString();
            this.departmentSelect.appendChild(option);
        });
        this.levelInput.value = '1'; 
        this.dateInput.valueAsDate = new Date(); 
    }

    private createInputFieldForSkillNumber(div: HTMLDivElement): void {
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

    private createInputForSkillName(div: HTMLDivElement): void {
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

    // Gère l'affichage de l'ajout de composants
    private createDivForManageComponents(div: HTMLDivElement): void {
        let subDiv = document.createElement("div");
        // Création de l'étiquette, de la zone de saisi et du bouton
        let label = document.createElement("label");
        label.innerHTML = "Component:";
        subDiv.appendChild(label);
        let input = document.createElement("input");
        input.type = "text";
        subDiv.appendChild(input);
        let button = document.createElement("button");
        button.type="button";
        button.innerHTML = "Add Component";
        button.onclick = () => {
            // un item de liste est créé avec comme valeur le texte placé dans la zone de saisie
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

    // Gère l'affichage de l'ajout de compétence
    private addNewSkill(): void {
        let skillDiv = document.createElement("div");
        
        let skillsContainer = document.getElementById("skills");
        skillsContainer.appendChild(skillDiv);
    
        this.currentSkillNumber++;
    
        this.createInputFieldForSkillNumber(skillDiv);
        this.createInputForSkillName(skillDiv);
        this.createDivForManageComponents(skillDiv);
    }   

    // Créé un nouveau référentiel
    private async createSkillSet(): Promise<void> {
        const selectedDeptCode = this.departmentSelect.value;
    
        let newSkillSet = new SkillSet(selectedDeptCode);
        newSkillSet.setName(this.nameInput.value);
        newSkillSet.setLevel(parseInt(this.levelInput.value));
        newSkillSet.setDate(new Date(this.dateInput.value));
        newSkillSet.setActive(true);
    
        // Pour chaque skill
        for (let i = 0; i < this.currentSkillNumber; i++) {
            let skill = new Skill(); 
            skill.setId(parseInt(this.numbers[i].value));
            skill.setLabel(this.labels[i].value);
            skill.setNumber(parseInt(this.numbers[i].value));
            // Parcourt les composant essentiels
            console.log("List children:", this.lists[i].children);
            for (let item of this.lists[i].children) {
                console.log("Processing item:", item, "Content:", item.textContent);
                let component = new Component(); 
                component.setLabel(item.textContent);
                skill.addComponent(component);
            }
    
            // Ajoute la compétence au référentiel
            newSkillSet.addSkill(skill);
            console.log(skill);
        }
        console.log(newSkillSet);
        let skillAccess = new SkillAccess();
        try {
            let result = await skillAccess.create(newSkillSet, this.token);
            if (result) {
                alert("SkillSet created successfully!");
                window.location.href = "index.html"; 
            } else {
                alert("Failed to create SkillSet.");
            }
        } catch (error) {
            console.error('Failed to save the skill set:', error);
            alert("Error creating SkillSet: " + error.message);
        }
    }
    private redirectToHomepage(): void{
        window.location.href = "index.html";
    } 
    
}
