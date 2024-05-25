/// <reference path="../model/SkillSet.ts" />
class SkillAccess{
    private apiUrl: string = 'http://localhost/tp/2024-R410-DUBOZ/server/api.php?action=get_skillsets&code='

    public async getSkillSets(codeDept: string): Promise<SkillSet[]> {
        try {
            const response = await fetch(this.apiUrl + codeDept);
            const data = await response.json();
            return data.map((skillSetObj: any) => SkillSet.createFromObject(skillSetObj));
        } catch (error) {
            console.error('Erreur de récupération des compétences:', error);
            throw error; 
        }
    }

    public async create(set: SkillSet, token: Token): Promise<boolean> {
        const compositeObject = {
            skillSet: set,
            token: token
        };
    
        const str = JSON.stringify(compositeObject);
    
        let response = await fetch("http://localhost/tp/2024-R410-DUBOZ/server/api.php?action=add_skillset", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json"
            },
            body: str
        });
        return response.ok;
    }

}