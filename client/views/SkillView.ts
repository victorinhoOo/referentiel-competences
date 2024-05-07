/// <reference path="../data/DepartmentAccess.ts" />
// Gère l'affichage du référentiel d'activité
class SkillView {
    private departmentSelect: HTMLSelectElement;
    private departmentAccess: DepartmentAccess;
    private levelInput: HTMLInputElement;
    private nameInput: HTMLInputElement;
    private dateInput: HTMLInputElement;

    private currentSkillNumber: number;
    private labels: Array<HTMLLabelElement>;
    private numbers: Array<HTMLInputElement>;
    private lists: Array<HTMLUListElement>;

    constructor() {
        this.departmentSelect = document.getElementById('departmentSelect') as HTMLSelectElement;
        this.levelInput = document.getElementById('repoLevel') as HTMLInputElement;
        this.nameInput = document.getElementById('repoName') as HTMLInputElement;
        this.dateInput = document.getElementById('repoDate') as HTMLInputElement;
        this.departmentAccess = new DepartmentAccess();

        this.currentSkillNumber = 0;
        this.labels = [];
        this.numbers = [];
        this.lists = [];

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
}
