class Assessment {
    constructor(user, skillSet, autoeval = false) {
        this.user = user;
        this.skillSet = skillSet;
        this.autoeval = autoeval;
        this.validations = [];
    }
    getAutoeval() {
        return this.autoeval;
    }
    setAutoeval(value) {
        this.autoeval = value;
    }
    addValidation(element, level) {
        const validation = new Validation(level, element);
        this.validations.push(validation);
    }
    toObject() {
        return {
            id_skillset: this.skillSet.getId(),
            login_student: this.user.getLogin(),
            autoeval: this.autoeval,
            validations: this.validations.map(v => v.toObject())
        };
    }
}
//# sourceMappingURL=Assessment.js.map