var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class AssessmentAccess {
    createAssessment(assessment) {
        return __awaiter(this, void 0, void 0, function* () {
            const object = new Object();
            object["assessment"] = assessment.toObject();
            console.log(assessment.toObject());
            const str = JSON.stringify(object);
            const url = "https://grp-440.iq.iut21.u-bourgogne.fr/skills/server/api.php?action=add_assessment";
            let response = yield fetch(url, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json"
                },
                body: str
            });
            let ret = true;
            if (!response.ok) {
                const msg = yield response.text();
                console.log(msg);
                ret = false;
            }
            return ret;
        });
    }
}
//# sourceMappingURL=AssessmentAccess.js.map