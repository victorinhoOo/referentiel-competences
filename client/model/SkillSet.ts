/// <reference path="../model/Skill.ts" />
class SkillSet{
    private id: number;
    private name: string;
    private level: number;
    private date: Date;
    private active: Boolean;
    private code_department: string;

    private skills: Array<Skill>

    public createFromObject(obj): SkillSet{
        const skillSet = new SkillSet(obj.code_department); 

        // Initialise les propriétés de l'instance skillSet avec les valeurs de l'objet obj
        skillSet.id = obj.id;
        skillSet.name = obj.name;
        skillSet.level = obj.level;
        skillSet.date = new Date(obj.date); // Assurez-vous que la date est correctement instanciée comme un objet Date
        skillSet.active = obj.active;
    }
    public _constructor(code_dept: string){
        this.code_department = code_dept;
        this.skills = []
        this.id = 0;
    }
    public addSkill(skill: Skill): void{
        this.skills.push(skill)
    }
    public toString(): string{
        return `SkillSet ID: ${this.id}, Name: ${this.name}, Level: ${this.level}, Date: ${this.date}, Active: ${this.active}, Department Code: ${this.code_department}`;
    }
    public async create(set: SkillSet): Promise<boolean>{
        const str = JSON.stringify(set); 
        let response = await fetch("server/api.php?action=add_skillset", {
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