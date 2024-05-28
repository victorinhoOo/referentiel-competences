/// <reference path="../model/SkillSet.ts" />
/**
 * Gère l'accès aux référentiels de compétences sur le serveur
 */
class SkillAccess{
    private apiUrl: string = 'http://grp-440.iq.iut21.u-bourgogne.fr/skills/server/api.php?action=get_skillsets&code='

    /**
     * Récupère tous les référentiels de compétences correspondants à un département
     * @param codeDept département pour lequel on souhaite obtenir les compétences
     * @returns Référentiel de compétence
     */
    public async getSkillSets(codeDept: string): Promise<SkillSet[]> {
        try {
            const response = await fetch(this.apiUrl + codeDept);
            const data = await response.json();
            return data.map((skillSetObj: any) => SkillSet.createFromObject(skillSetObj));
        } catch (error) {
            console.error('Erreur de récupération des compétences:', error);
            throw error; 
        }
    }

    /**
     * Créé un référentiel de compétences via le serveur
     * @param set référentiel de compétences à créé
     * @param token token d'authentification utilisateur
     * @returns True si la création a réussie
     */
    public async create(set: SkillSet, token: Token): Promise<boolean> {
        const compositeObject = {
            skillSet: set,
            token: token
        };
    
        const str = JSON.stringify(compositeObject);
    
        let response = await fetch("http://grp-440.iq.iut21.u-bourgogne.fr/skills/server/api.php?action=add_skillset", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json"
            },
            body: str
        });
        let ret = true;
        if (!response.ok) {
            const msg = await response.text();
            console.log(msg);
            ret = false;
        }
        return ret;
    }

    /**
     * Récupère un référentiel de compétences complet depuis le serveur en utilisant son identifiant.
     * @param {number} id - id du SkillSet à récupérer
     * @returns {Promise<SkillSet>} - Le SkillSet récupéré
     */
    public async getSkillSetById(id: number): Promise<SkillSet> {
        try {
            const response = await fetch(`http://grp-440.iq.iut21.u-bourgogne.fr/skills/server/api.php?action=get_skillset&id=${id}`);
            const data = await response.json();
            return SkillSet.createFromObject(data); 
        } catch (error) {
            console.error('Erreur de récupération du SkillSet:', error);
            throw error;
        }
    }
}