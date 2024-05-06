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
}
?>