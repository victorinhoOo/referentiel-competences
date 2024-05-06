<?php
require_once("skills_data.php");

/**
 * Service of skill sets
 */
class SkillsService
{
    private SkillsData $dao;

    /**
     * Init the service
     * @param SkillsData $data skills repository
     */
    public function __construct(SkillsData $data){
        $this->dao = $data;
    }

    /**
     * Get all the skill sets of a department
     * @param string $codeDept code of a department
     * @return array array of skillsets
     */
    public function getSets(string $codeDept) : array{
        return $this->dao->getSets($codeDept);
    }
}
?>