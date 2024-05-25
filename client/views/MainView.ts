/// <reference path="../model/department.ts" />
/// <reference path="../data/DepartmentAccess.ts" />
/// <reference path="../data/SkillsAccess.ts" />
/// <reference path="../model/Token.ts" />
class MainView{
    private selectElement: HTMLSelectElement;
    private departmentAccess: DepartmentAccess;
    private selectSkill: HTMLSelectElement;
    private skillAccess: SkillAccess;

    constructor(selectId: string, selectSkillId : string) {
        try {
            const token = Token.createFromSessionStorage();
        }
        catch (e) {
            alert("You are not connected");
            window.location.href = "login.html";
        }
        this.selectElement = document.getElementById(selectId) as HTMLSelectElement;
        this.departmentAccess = new DepartmentAccess();
        this.skillAccess = new SkillAccess();
        this.selectSkill = document.getElementById(selectSkillId) as HTMLSelectElement;
        this.selectElement.onchange = () => this.ChooseDept();

        const competencesButton = document.getElementById("competencesButton") as HTMLButtonElement;
        competencesButton.onclick = () => this.storeSkillSet();

        this.init();
    }

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
    private async ChooseDept(): Promise<void> {
        const selectedDeptCode = this.selectElement.value;
        const skillSets = await this.skillAccess.getSkillSets(selectedDeptCode);
        this.selectSkill.innerHTML = '';
        skillSets.forEach(skillSet => {
            const option = document.createElement('option');
            option.value = skillSet.getId.toString(); 
            option.textContent = skillSet.toString(); 
            this.selectSkill.appendChild(option);
        });
    }
    private async storeSkillSet(): Promise<void> {
        const selectedIndex = this.selectSkill.selectedIndex;
        const selectedOption = this.selectSkill.options[selectedIndex];
        const skillSetId = selectedOption.value;
        try {
            const skillSet = await this.skillAccess.getSkillSets(skillSetId); // Assuming there is a method to fetch skill set by ID
            const skillSetJson = JSON.stringify(skillSet);
            sessionStorage.setItem("skillset", skillSetJson);
        } catch (error) {
            console.error("Error storing skill set:", error);
        }
    }  
}
