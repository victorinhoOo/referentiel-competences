<?php
require_once("./model/skills_service.php");

/**
 * Controller for skills
 */
class SkillsController{
    private SkillsService $service;

    /**
     * Init the controller
     * @param SkillsService $service the service used to obtain data
     */
    public function __construct(SkillsService $service){
        $this->service = $service;
    }

    /**
     * Get all skillsets of a department
     * @param string $code code of the department
     * Http response --> json array with skill sets
     */
    public function getSkillsSet(string $code){

        $skillsets = $this->service->getSets($code);
        echo json_encode($skillsets);
    }

    /**
     * Add a skill set
     * @param SkillSet $set skillset to add
     * @param Token $token the authorization token
     * Warning : only a chief can access this API
     * @throws AuthorizeException if no token or user not authorized
     * HTTP response : id of the skillset (not usable)
     */
    public function addSkillSet(SkillSet $set, Token $token){
        if($token==null || !$token->checkToken())
            throw new AuthorizeException("invalid token");
        if(!$token->hasRole("chief"))
            throw new AuthorizeException("User $token->getUsername() is not authorized");
        $this->service->addSkillSet($set);
        echo $set->getId();
    }
}
?>