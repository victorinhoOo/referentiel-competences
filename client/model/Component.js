class Component {
    setId(value) {
        this.id = value;
    }
    getId() {
        return this.id;
    }
    setLabel(value) {
        this.label = value;
    }
    getLabel() {
        return this.label;
    }
    getType() {
        return "component";
    }
    constructor() {
        this.id = 0;
        this.label = '';
    }
    static createFromObject(obj) {
        let component = new Component();
        component.id = obj.id;
        component.label = obj.label;
        return component;
    }
}
//# sourceMappingURL=Component.js.map