/// <reference path="../model/Skill.ts" />
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

    public static createFromObject(obj): SkillSet{
        const skillSet = new SkillSet(obj.code_department); 
        skillSet.id = obj.id;
        skillSet.name = obj.name;
        skillSet.level = obj.level;
        skillSet.date = new Date(obj.date); 
        skillSet.active = obj.active;

        return skillSet;
    }
    public constructor(code_dept: string){
        this.code_department = code_dept;
        this.skills = [];
        this.id = 0;
        this.date = new Date();
        this.active = false;
        this.name = '';
        this.level = 0;
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