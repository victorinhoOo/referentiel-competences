/// <reference path="../model/department.ts" />
/**
 * Gère l'accès aux départements sur le serveur
 */
class DepartmentAccess {
    private apiUrl: string = 'http://grp-440.iq.iut21.u-bourgogne.fr/skills/server/api.php?action=get_depts';

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