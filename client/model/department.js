class Department {
    get code() {
        return this._code;
    }
    get name() {
        return this._name;
    }
    constructor(code, name) {
        this._code = code;
        this._name = name;
    }
    static createFromObject(obj) {
        return new Department(obj.code, obj.name);
    }
    toString() {
        return this._name;
    }
}
//# sourceMappingURL=department.js.map