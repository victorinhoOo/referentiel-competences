class Validation {
    constructor(level, element) {
        this.level = level;
        this.element = element;
    }
    toObject() {
        return {
            level: this.level,
            id_element: this.element.getId(),
            type_element: this.element.getType()
        };
    }
}
//# sourceMappingURL=Validation.js.map