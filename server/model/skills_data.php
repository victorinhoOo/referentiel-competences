<?php

/**
 * Interface to skillsets repository
 */
interface SkillsData
{
    /**
     * Get all the skill sets of a department
     * @param string $codeDept the department's code
     * @return array array of skill sets
     */
    function getSets(string $codeDept): array;
    /**
     * Add skill set
     * @param SkillSet $skillSet the skill set to add
     * */
    function insertSkillSet(SkillSet $skillSet);

    /**
     * Get an entire skillset from its id     
     * @param int $id id of skillset
     * @return array associative array with properties of skillset
     */
    function getSkillSet(int $id):array;
}
?>