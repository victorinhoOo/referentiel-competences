/// <reference path="../model/department.ts" />
class DepartmentAccess {
    private apiUrl: string = 'http://localhost/tp/2024-R410-DUBOZ/server/api.php?action=get_depts';

    public async getAll(): Promise<Department[]> {
        try {
            const response = await fetch(this.apiUrl); 
            const data = await response.json();
            const departments: Department[] = data.map((deptData: any) => Department.createFromObject(deptData));
            return departments;
        } catch (error) {
            console.error('Erreur de récupération des départements:', error);
            throw error; 
        }
    }
}