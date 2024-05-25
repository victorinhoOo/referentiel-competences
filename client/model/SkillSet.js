class SkillSet {
    getId() {
        return this.id;
    }
    setId(newId) {
        this.id = newId;
    }
    getName() {
        return this.name;
    }
    setName(newName) {
        this.name = newName;
    }
    getLevel() {
        return this.level;
    }
    setLevel(newLevel) {
        this.level = newLevel;
    }
    getDate() {
        return this.date;
    }
    setDate(newDate) {
        this.date = newDate;
    }
    isActive() {
        return this.active;
    }
    setActive(newActive) {
        this.active = newActive;
    }
    getCodeDepartment() {
        return this.code_department;
    }
    setCodeDepartment(newCodeDepartment) {
        this.code_department = newCodeDepartment;
    }
    static createFromObject(obj) {
        const skillSet = new SkillSet(obj.code_department);
        skillSet.setId(obj.id);
        skillSet.setName(obj.name);
        skillSet.setLevel(obj.level);
        skillSet.setDate(new Date(obj.date));
        skillSet.setActive(obj.active === 1);
        return skillSet;
    }
    constructor(code_dept) {
        this.code_department = code_dept;
        this.skills = [];
        this.id = 0;
        this.date = new Date();
        this.active = false;
        this.name = '';
        this.level = 0;
    }
    addSkill(skill) {
        this.skills.push(skill);
    }
    toString() {
        return this.name;
    }
}
//# sourceMappingURL=SkillSet.js.map