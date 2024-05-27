/// <reference path="../model/department.ts" />
/// <reference path="../data/DepartmentAccess.ts" />
/// <reference path="../data/SkillsAccess.ts" />
/// <reference path="../model/Token.ts" />
class MainView{
    private selectElement: HTMLSelectElement;
    private departmentAccess: DepartmentAccess;
    private selectSkill: HTMLSelectElement;
    private skillAccess: SkillAccess;
    private skillSets : SkillSet[];

    /**
     * Constructeur de la classe MainView.
     * @param selectId Identifiant HTML du menu déroulant des départements.
     * @param selectSkillId Identifiant HTML du menu déroulant des skill sets.
     */
    constructor(selectId: string, selectSkillId : string) {
        // vérifie la connexion
        try {
            const token = Token.createFromSessionStorage();
        }
        catch (e) {
            alert("Vous n'êtes pas connecté");
            window.location.href = "login.html";
        }
        // Initialisation des éléments et des accès aux données
        this.selectElement = document.getElementById(selectId) as HTMLSelectElement;
        this.departmentAccess = new DepartmentAccess();
        this.skillAccess = new SkillAccess();
        this.selectSkill = document.getElementById(selectSkillId) as HTMLSelectElement;
        this.selectElement.onchange = () => this.ChooseDept();

        const competencesButton = document.getElementById("competencesButton") as HTMLButtonElement;
        competencesButton.onclick = () => this.storeSkillSet();

        this.init();
    }

    /**
     * Initialise les menus déroulants avec les départements.
     */
    private async init(): Promise<void> {
        this.selectElement.innerHTML = '';  
        // Récupère les départements et les ajoute au select
        const departments = await this.departmentAccess.getAll();
        departments.forEach(department => {
            const option = document.createElement('option');
            option.value = department.code; 
            option.textContent = department.toString(); 
            this.selectElement.appendChild(option); 
        });
        this.ChooseDept();
    }

    /**
     * Charge et affiche les ensembles de compétences associés au département sélectionné.
     */
    private async ChooseDept(): Promise<void> {
        const selectedDeptCode = this.selectElement.value;
        this.skillSets = await this.skillAccess.getSkillSets(selectedDeptCode);
        this.selectSkill.innerHTML = '';
        this.skillSets.forEach(skillSet => {
            const option = document.createElement('option');
            option.value = skillSet.getId.toString(); 
            option.textContent = skillSet.toString(); 
            this.selectSkill.appendChild(option);
        });
    }

    /**
     * Stocke le skillset sélectionné dans le sessionStorage.
     */
    private async storeSkillSet(): Promise<void> {
        const selectedIndex = this.selectSkill.selectedIndex;
        const skillSet = this.skillSets[selectedIndex];
        try {
            sessionStorage.setItem("skillset", JSON.stringify(skillSet));
        } catch (error) {
            console.error("Erreur lors du stockage du skill set:", error);
        }
    }
}
