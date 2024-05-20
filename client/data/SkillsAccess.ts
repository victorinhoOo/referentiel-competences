/// <reference path="../model/SkillSet.ts" />
class SkillAccess{
    private apiUrl: string = 'https://grp-440.iq.iut21.u-bourgogne.fr/skills/server/api.php?action=get_skillsets&code='

    public async getSkillSets(codeDept : string): Promise<SkillSet[]>{
        try {
            const response = await fetch(this.apiUrl + codeDept); 
            const data = await response.json();
            return data.map((skillSetObj: any) => SkillSet.createFromObject(skillSetObj));
        } catch (error) {
            console.error('Erreur de récupération des compétences:', error);
            throw error; 
        }
    }
    public async create(set: SkillSet): Promise<boolean>{
        const str = JSON.stringify(set);
        let response = await fetch("https://grp-440.iq.iut21.u-bourgogne.fr/skills/server/api.php?action=add_skillset", {
        method: "POST",
        headers: {
        "Accept": "application/json",
        "Content-type":"application/json"
        },
        body: str
        });
        let ret = true;
        if (!response.ok) {
        ret = false;
        }
        return ret;
        }

}