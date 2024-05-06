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
}
?>