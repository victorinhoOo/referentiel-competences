class Department {
    private readonly _code: string;
    private readonly _name: string;

    public get code(): string {
        return this._code;
    }
    
    public get name(): string {
        return this._name;
    }

    /**
     * Construit un département à partir d'un code et d'un nom
     * @param code code du département
     * @param name nom du département
     */
    constructor(code: string, name: string) {
        this._code = code;
        this._name = name;
    }

    /**
     * Créé un département à partir d'un objet
     * @param obj objet pour la création
     * @returns nouveau departement
     */
    public static createFromObject(obj): Department {
        return new Department(obj.code, obj.name);
    }

    /**
     * Renvoi le nom du département sous forme de chaîne de caractères
     * @returns nom du département
     */
    public toString(): string {
        return this._name;
    }
}
