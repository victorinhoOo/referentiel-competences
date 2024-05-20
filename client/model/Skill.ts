/// <reference path="../model/Component.ts" />
// Gère les attributs des skills
class Skill{
    private id: number;
    public getId(): number {
        return this.id;
    }
    public setId(value: number): void {
        this.id = value;
    }

    private label: string;
    public setLabel(value: string): void {
        this.label = value;
    }
    private number: number;
    private components: Array<Component>;

    public constructor() {
        this.components = [];
    }

    public addComponent(c: Component): void {
        this.components.push(c);
    }
}