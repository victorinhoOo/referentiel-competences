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

    public static createFromObject(obj: any): SkillSet {
        const skillSet = new SkillSet(obj.code_department);
        skillSet.setId(obj.id);
        skillSet.setName(obj.name);
        skillSet.setLevel(obj.level);
        skillSet.setDate(new Date(obj.date));
        skillSet.setActive(obj.active === 1);
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
        this.skills.push(skill);
    }
    public toString(): string{
        return this.name;
    }
}