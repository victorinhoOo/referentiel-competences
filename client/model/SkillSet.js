var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
        skillSet.id = obj.id;
        skillSet.name = obj.name;
        skillSet.level = obj.level;
        skillSet.date = new Date(obj.date);
        skillSet.active = obj.active;
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
        return `SkillSet ID: ${this.id}, Name: ${this.name}, Level: ${this.level}, Date: ${this.date}, Active: ${this.active}, Department Code: ${this.code_department}`;
    }
    create(set) {
        return __awaiter(this, void 0, void 0, function* () {
            const str = JSON.stringify(set);
            let response = yield fetch("server/api.php?action=add_skillset", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json"
                },
                body: str
            });
            let ret = true;
            if (!response.ok) {
                ret = false;
            }
            return ret;
        });
    }
}
//# sourceMappingURL=SkillSet.js.map