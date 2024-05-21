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
    constructor() {
        this.components = [];
    }
    addComponent(c) {
        this.components.push(c);
    }
}
//# sourceMappingURL=Skill.js.map