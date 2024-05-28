class Skill {
    getId() {
        return this.id;
    }
    setId(value) {
        this.id = value;
    }
    setLabel(value) {
        this.label = value;
    }
    getLabel() {
        return this.label;
    }
    setNumber(value) {
        this.number = value;
    }
    getType() {
        return "skill";
    }
    constructor() {
        this.components = [];
        this.components = [];
    }
    addComponent(c) {
        this.components.push(c);
    }
    getComponents() {
        return this.components;
    }
    static createFromObject(obj) {
        let skill = new Skill();
        skill.id = obj.id;
        skill.number = obj.number;
        skill.label = obj.label;
        if (obj.components) {
            obj.components.forEach((c) => {
                let component = Component.createFromObject(c);
                skill.components.push(component);
            });
        }
        return skill;
    }
}
//# sourceMappingURL=Skill.js.map