/// <reference path="../model/department.ts" />
/// <reference path="../data/DepartmentAccess.ts" />
class MainView{
    private selectElement: HTMLSelectElement;
    private departmentAccess: DepartmentAccess;

    constructor(selectId: string) {
        this.selectElement = document.getElementById(selectId) as HTMLSelectElement;
        this.departmentAccess = new DepartmentAccess();
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
}
