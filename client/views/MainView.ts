/// <reference path="../model/department.ts" />
/// <reference path="../data/DepartmentAccess.ts" />
/// <reference path="../data/SkillsAccess.ts" />
class MainView{
    private selectElement: HTMLSelectElement;
    private departmentAccess: DepartmentAccess;
    private selectSkill: HTMLSelectElement;
    private skillAccess: SkillAccess

    constructor(selectId: string, selectSkillId : string) {
        this.selectElement = document.getElementById(selectId) as HTMLSelectElement;
        this.departmentAccess = new DepartmentAccess();
        this.skillAccess = new SkillAccess();
        this.selectSkill = document.getElementById(selectSkillId) as HTMLSelectElement;
        this.selectElement.onchange = () => this.ChooseDept();

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
}
