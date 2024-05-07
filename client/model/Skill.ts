/// <reference path="../model/Component.ts" />
// Gère les attributs des skills
class Skill{
    private id: number;
    private label: string;
    private number: number;
    private components: Array<Component>;

    constructor() {
        this.components = [];
    }

    public addComponent(c: Component): void {
        this.components.push(c);
    }
}