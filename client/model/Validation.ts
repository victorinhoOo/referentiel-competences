/// <reference path="../model/ValidationLevel.ts" />
/// <reference path="../model/SkillElement.ts" />
/**
 * Gère les validations d'éléments de compétences
 */
class Validation {
    private level: ValidationLevel;
    private element: SkillElement;

    constructor(level: ValidationLevel, element: SkillElement) {
        this.level = level;
        this.element = element;
    }
    /**
     * @returns Un objet brut de validation
     */
    public toObject(): any {
        return {
            level: this.level,
            id_element: this.element.getId(),
            type_element: this.element.getType()
        };
    }
}
