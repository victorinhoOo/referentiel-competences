class Department {
    private readonly _code: string;
    private readonly _name: string;

        public get code(): string {
            return this._code;
        }
    
        public get name(): string {
            return this._name;
        }

    constructor(code: string, name: string) {
        this._code = code;
        this._name = name;
    }

    public static createFromObject(obj): Department {
        return new Department(obj.code, obj.name);
    }

    public toString(): string {
        return this._name;
    }
}
