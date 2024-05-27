/// <reference path="../model/Component.ts" />
/// <reference path="../model/SkillElement.ts" />
/**
 * Gère les attributs des compétences
 */
class Skill implements SkillElement {
    private id: number; 

    /**
     * Renvoie l'id de la compétence.
     * @returns id de la compétence.
     */
    public getId(): number {
        return this.id;
    }

    /**
     * Définit l'identifiant de la compétence.
     * @param value nouvel id 
     */
    public setId(value: number): void {
        this.id = value;
    }

    private label: string; 

    /**
     * Définit le libellé de la compétence.
     */
    public setLabel(value: string): void {
        this.label = value;
    }

    /**
     * Renvoie le label de la compétence
     * @returns chaine de caractère
     */
    public getLabel(): string{
        return this.label;
    }

    private number: number; 
    private components: Component[] = []; 

    public getType(): string {
        return "skill";
    }

    /**
     * Crée une instance de Skill.
     */
    public constructor() {
        this.components = [];
    }

    /**
     * Ajoute un composant à la compétence
     * @param c composant à ajouter
     */
    public addComponent(c: Component): void {
        this.components.push(c);
    }

    /**
     * Renvoie la liste des composants de la compétence
     * @returns tableau de composants
     */
    public getComponents(): Component[]{
        return this.components;
    }
    

    /**
     * Crée une instance de Skill à partir d'un objet 
     * @param obj objet contenant les données pour initialiser la compétence.
     * @returns skill créé ave l'objet
     */
    public static createFromObject(obj: any): Skill {
        let skill = new Skill();
        skill.id = obj.id;
        skill.number = obj.number;
        skill.label = obj.label;
        if (obj.components) {
            obj.components.forEach((c: any) => {
                let component = Component.createFromObject(c);
                skill.components.push(component);
            });
        }
        return skill;
    }
}
