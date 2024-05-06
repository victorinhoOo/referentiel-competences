/// <reference path="../model/department.ts" />
class DepartmentAccess{
    private apiUrl: string = 'https://grp-440.iq.iut21.u-bourgogne.fr/skills/server/api.php';
    
    public async getAll(): Promise<Department[]> {
        try {
            const response = await fetch(`${this.apiUrl}?action=get_depts`);
            const data = await response.json();
            const departments: Department[] = data.map((deptData: any) => Department.createFromObject(deptData));
            return departments;
        } catch (error) {
            console.error('Erreur de récupération des départements:', error);
            throw error; 
        }
    }
}