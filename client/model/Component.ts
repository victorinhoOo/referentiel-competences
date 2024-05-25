// Gère les composants
class Component{
    private id: number;
    public setId(value : number): void {
        this.id = value;
    }
    private label: String;
    public setLabel(value: string): void {
        this.label = value;
    }

    public constructor(){
        this.id = 0;
        this.label = '';
    }
}