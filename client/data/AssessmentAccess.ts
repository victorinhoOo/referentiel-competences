/// <reference path="../model/Assessment.ts" />
class AssessmentAccess{
    /**
     * Réalise une requête POST vers le serveur pour créer un bilan de compétence
     * @param assessment bilan de compétences à créer
     * @returns True si l'opération a réussi
     */
    public async createAssessment(assessment: Assessment):Promise<boolean> {
        const object = new Object();
        object["assessment"] = assessment.toObject();
        console.log(assessment.toObject());
        const str = JSON.stringify(object);
        const url = "http://grp-440.iq.iut21.u-bourgogne.fr/skills/server/api.php?action=add_assessment";
        let response = await fetch(url, {
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
}