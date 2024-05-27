/// <reference path="../model/Validation.ts" />
/// <reference path="../model/ValidationLevel.ts" />
/// <reference path="../model/SkillSet.ts" />
/// <reference path="../model/User.ts" />
class Assessment {
    private id: number;
    private autoeval: boolean;
    private user: User;
    private skillSet: SkillSet;
    private validations: Validation[];

    /**
     * Créé une nouvelle instance d'évaluation.
     * @param {User} user - L'utilisateur associé à cette évaluation.
     * @param {SkillSet} skillSet - Le set de compétences évalué.
     * @param {boolean} autoeval - Optionnel. Spécifie si l'évaluation est une auto-évaluation. Par défaut à false.
     */
    constructor(user: User, skillSet: SkillSet, autoeval: boolean = false) {
        this.user = user;
        this.skillSet = skillSet;
        this.autoeval = autoeval;
        this.validations = [];
    }

    /**
     * Retourne l'état de l'auto-évaluation.
     * @returns {boolean} - Vrai si l'évaluation est une auto-évaluation, faux autrement.
     */
    public getAutoeval(): boolean {
        return this.autoeval;
    }

    /**
     * Définit l'état de l'auto-évaluation.
     * @param {boolean} value - Vrai pour marquer comme auto-évaluation, faux autrement.
     */
    public setAutoeval(value: boolean): void {
        this.autoeval = value;
    }

    /**
     * Ajoute une validation à la liste des validations de l'évaluation.
     * @param {SkillElement} element élément de compétence à valider.
     * @param {ValidationLevel} level  niveau de validation appliqué à l'élément.
     */
    public addValidation(element: SkillElement, level: ValidationLevel): void {
        const validation = new Validation(level, element);
        this.validations.push(validation);
    }

    /**
     * Convertit l'évaluation en un objet JSON 
     * @returns {Object} objet brut représentant l'état de l'évaluation
     */
    public toObject(): Object {
        return {
            id_skillset: this.skillSet.getId(),
            login_student: this.user.getLogin(),
            autoeval: this.autoeval,
            validations: this.validations.map(v => v.toObject())
        };
    }
}

