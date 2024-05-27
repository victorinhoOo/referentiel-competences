/// <reference path="../model/Skill.ts" />

/**
 * Représente un ensemble de compétences.
 */
class SkillSet{
    private id: number;

    public getId(): number {
        return this.id;
    }
    public setId(newId: number): void {
        this.id = newId;
    }

    private name: string;
    public getName(): string {
        return this.name;
    }
    public setName(newName: string): void {
        this.name = newName;
    }
        
    private level: number;
    public getLevel(): number {
        return this.level;
    }
    public setLevel(newLevel: number): void {
        this.level = newLevel;
    }
        
    private date: Date;
    public getDate(): Date {
        return this.date;
    }
    public setDate(newDate: Date): void {
        this.date = newDate;
    }
        
    private active: Boolean;
    public isActive(): Boolean {
        return this.active;
    }
    public setActive(newActive: boolean): void {
        this.active = newActive;
    }    

    private code_department: string;
    public getCodeDepartment(): string {
        return this.code_department;
    }
    public setCodeDepartment(newCodeDepartment: string): void {
        this.code_department = newCodeDepartment;
    }
    
    private skills: Array<Skill>

    public static createFromObject(obj: any): SkillSet {
        const skillSet = new SkillSet(obj.code_department);
        skillSet.setId(obj.id);
        skillSet.setName(obj.name);
        skillSet.setLevel(obj.level);
        skillSet.setDate(new Date(obj.date));
        skillSet.setActive(obj.active === 1);
        if (obj.skills) {
            obj.skills.forEach((s) => {
            let skill = Skill.createFromObject(s);
            skillSet.skills.push(skill);
            });
        }
        return skillSet;
    }
    /**
     * Crée une instance de SkillSet
     */
    public constructor(code_dept: string){
        this.code_department = code_dept;
        this.skills = [];
        this.id = 0;
        this.date = new Date();
        this.active = false;
        this.name = '';
        this.level = 0;
    }

    /**
     * Ajoute une compétence au skillset
     */
    public addSkill(skill: Skill): void{
        this.skills.push(skill);
    }
    /**
     * @returns renvoi le nom du skillset
     */
    public toString(): string{
        return this.name;
    }

    /**
     * Obtient la compétence à l'index spécifié.
     * @param index index de la compétence à récupérer.
     * @returns compétence à cet index
     */
    public getSkillAtIndex(index: number): Skill {
        return this.skills[index];
    }

    public getSkills(): Array<Skill>{
        return this.skills;
    }
}