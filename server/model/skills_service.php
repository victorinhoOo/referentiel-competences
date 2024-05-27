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

    /**
     * Add a skill set to data
     * @param SkillSet $set the new skill set
     */
    public function addSkillSet(SkillSet $set)
    {
        $this->dao->insertSkillSet($set);
    }

    /**
     * Get an entire skill set from its id
     * @param int $id id of skillset
     * @return array associative array with properties of the skillset
     */
    public function getSkillSet(int $id):array
    {
        return $this->dao->getSkillSet($id);
    }
}
?>