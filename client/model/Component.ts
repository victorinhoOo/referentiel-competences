// Gère les composants
class Component implements SkillElement{
    private id: number;
    public setId(value : number): void {
        this.id = value;
    }
    public getId(): number{
        return this.id;
    }
    private label: String;
    public setLabel(value: string): void {
        this.label = value;
    }
    public getLabel(): String{
        return this.label;
    }
    public getType(): string {
        return "component";
    }

    /**
     * Construit un composant
     */
    public constructor(){
        this.id = 0;
        this.label = '';
    }

    /**
     * 
     * @param obj Créé un composant à partir d'un objet
     * @returns nouveau composant
     */
    public static createFromObject(obj): Component {
        let component = new Component();
        component.id = obj.id;
        component.label = obj.label;
        return component;
    }
}